import * as mlAst from "../ngc/ml_parser/ast";
import * as xml from "../ngc/i18n/serializers/xml_helper";
import { XmlParser } from "../ngc/ml_parser/xml_parser";

const _VERSION = '1.0';

const _XTM_TAG = 'xtm';
const _BODY_TAG = 'body';
const _MEMORY_CELL_TAG = 'mc';
const _IDENTIFIER_TAG = 'identifier';
const _LOCALE_TARGET_GROUPS_TAG = 'locale-target-groups';
const _LOCALE_TARGET_TAG = 'locale-target';
const _MEMORY_UNIT_TAG = 'mu';
const _TARGET_TAG = 'target';
const _DESCRIPTION_TAG = 'description';
const _MEANING_TAG = 'meaning';

const _VERSION_ATTR = 'version';
const _SOURCE_LOCALE_ATTR = 'source-locale';
const _LOCALE_ATTR = 'locale';
const _STATE_ATTR = 'state';
const _KEY_ATTR = 'key';

export class Xtm {

  /**
   * Write translation memories into xtm file
   *
   * @static
   * @param {string} sourceLocale
   * @param {xtm.IMemoryCell[]} memories
   * @returns
   * @memberof Xtm
   */
  static writeTranslationMemories(
    sourceLocale: string,
    memories: xtm.IMemoryCell[],
  ) {
    const memoryNodes: xml.Node[] = [];
    memories.forEach(m => {
      const ltgNodes: xml.Node[] = [];
      if (m.localeTargetGroups) {
        const ltGroups: xml.Node[] = [];
        m.localeTargetGroups.forEach((lt, ltIdx) => {
          const tars: xml.Node[] = [];
          lt.memoryUnits.forEach((mUnit, muIdx) => {
            const mu = new xml.Tag(_MEMORY_UNIT_TAG,
              {
                [_KEY_ATTR]: mUnit.key,
                [_STATE_ATTR]: mUnit.state,
              },
              [
                new xml.CR(12),
                new xml.Tag(_TARGET_TAG, {}, [new xml.Text(mUnit.target)]),
                new xml.CR(12),
                new xml.Tag(_IDENTIFIER_TAG, {}, [new xml.Text(mUnit.identifier)]),
              ]
            );

            if (mUnit.meaning) {
              mu.children.push(
                ...[
                  new xml.CR(12),
                  new xml.Tag(_MEANING_TAG, {}, [new xml.Text(mUnit.meaning)])
                ]
              );
            }
            if (mUnit.description) {
              mu.children.push(
                ...[
                  new xml.CR(12),
                  new xml.Tag(_DESCRIPTION_TAG, {}, [new xml.Text(mUnit.description)]),
                ]
              );
            }
            mu.children.push(new xml.CR(10));
            tars.push(new xml.CR(10), mu);
          });
          const ltNode = new xml.Tag(_LOCALE_TARGET_TAG,
            {
              [_LOCALE_ATTR]: lt.locale,
            },
            [
              ...tars,
              new xml.CR(8)
            ]
          );
          ltGroups.push(new xml.CR(8), ltNode);
        });

        const ltGroupsNode = new xml.Tag(_LOCALE_TARGET_GROUPS_TAG, {}, [
          ...ltGroups,
          new xml.CR(6)
        ]);
        ltgNodes.push(
          ltGroupsNode,
        );
      }

      const mc = new xml.Tag(_MEMORY_CELL_TAG, {});
      const srcIdfr = new xml.Tag(_IDENTIFIER_TAG, {}, [new xml.Text(m.sourceIdentifier)]);

      mc.children.push(...[
        new xml.CR(6),
        srcIdfr,
        new xml.CR(6),
        ...ltgNodes,
        new xml.CR(4),
      ]);

      memoryNodes.push(new xml.CR(4), mc);
    });

    const body = new xml.Tag(_BODY_TAG, {}, [
      ...memoryNodes, new xml.CR(2)
    ]);
    const xtm = new xml.Tag(_XTM_TAG,
      {
        [_VERSION_ATTR]: _VERSION,
        [_SOURCE_LOCALE_ATTR]: sourceLocale,
      },
      [
        new xml.CR(2),
        body,
        new xml.CR()
      ]
    );

    return xml.serialize([
      new xml.Declaration({ version: '1.0', encoding: 'utf-8' }), new xml.CR(),
      xtm,
      new xml.CR()
    ]);
  }


  static loadTranslationMemories(content: string, url: string) {
    const xtmParser = new XtmParser();
    const {
      memories, errors
    } = xtmParser.parse(content, url);
    return {
      memories, errors
    };
  }
}


class XtmParser implements mlAst.Visitor {

  private static readonly version = "1.0";

  private _xtmSourceLocale!: string;
  private _xtmVersion!: string;
  private _xtmTMCells!: xtm.IMemoryCell[];
  private _xtmTMCell!: xtm.IMemoryCell;
  private _xtmLocaleTargets!: xtm.ILocaleTarget[];
  private _xtmTMUnits!: xtm.IMemoryUnit[];

  parse(xtm: string, url: string): {
    memories: xtm.IMemoryCell[],
    sourceLocale: string,
    errors: string[]
  } {
    this._xtmTMCells = [];
    let errors: string[] = [];
    const xml = new XmlParser().parse(xtm, url);
    mlAst.visitAll(this, xml.rootNodes, null);
    if (this._xtmVersion !== XtmParser.version) {
      errors.push(`xtm version not match. actual: ${this._xtmVersion}, expected: ${XtmParser.version}`);
    }
    if (!this._xtmSourceLocale) {
      errors.push(`undefine source locale`);
    }
    return {
      memories: this._xtmTMCells,
      sourceLocale: this._xtmSourceLocale!,
      errors
    };
  }


  visitElement(element: mlAst.Element, context: xtm.IMemoryUnit): any {
    switch (element.name) {
      case _MEMORY_CELL_TAG:
        this._xtmTMCell = {} as any;
        mlAst.visitAll(this, element.children, null);
        this._xtmTMCells.push(this._xtmTMCell);
        break;

      case _LOCALE_TARGET_GROUPS_TAG:
        this._xtmLocaleTargets = [];
        mlAst.visitAll(this, element.children, null);
        this._xtmTMCell.localeTargetGroups = this._xtmLocaleTargets;
        break;

      case _LOCALE_TARGET_TAG:
        this._xtmTMUnits = [];
        const localeTarget: xtm.ILocaleTarget = {} as any;
        const localeAttr = element.attrs.find(x => x.name === _LOCALE_ATTR);
        if (localeAttr) {
          localeTarget.locale = localeAttr.value;
        }
        mlAst.visitAll(this, element.children, null);
        localeTarget.memoryUnits = this._xtmTMUnits;
        this._xtmLocaleTargets?.push(localeTarget);
        break;

      case _MEMORY_UNIT_TAG:
        const mcUnit: xtm.IMemoryUnit = {} as any;
        element.attrs.forEach(attr => {
          switch (attr.name) {
            case _KEY_ATTR:
              mcUnit.key = attr.value;
              break;
            case _STATE_ATTR:
              mcUnit.state = attr.value as any;
              break;
          }
        });
        mlAst.visitAll(this, element.children, mcUnit);
        this._xtmTMUnits?.push(mcUnit);
        break;

      case _TARGET_TAG:
      case _DESCRIPTION_TAG:
      case _MEANING_TAG:
        const text = this.extractInnerText(element);
        if (element.name === _TARGET_TAG) {
          context.target = text;
        } else if (element.name === _DESCRIPTION_TAG) {
          context.description = text;
        } else if (element.name === _MEANING_TAG) {
          context.meaning = text;
        }
        break;

      case _IDENTIFIER_TAG:
        const idfr = this.extractInnerText(element);
        if (context) {
          context.identifier = idfr;
        } else {
          this._xtmTMCell.sourceIdentifier = idfr;
        }
        break;

      case _XTM_TAG:
        element.attrs.forEach(attr => {
          switch (attr.name) {
            case _VERSION_ATTR:
              this._xtmVersion = attr.value.trim();
              break;
            case _SOURCE_LOCALE_ATTR:
              this._xtmSourceLocale = attr.value.trim();
              break;
            default:
              break;
          }
        });
        break;
      default:
        mlAst.visitAll(this, element.children, null);
    }
  }


  visitAttribute(attribute: mlAst.Attribute, context: any): any {
  }

  visitText(text: mlAst.Text, context: any): any {
  }

  visitComment(comment: mlAst.Comment, context: any): any {
  }

  visitExpansion(expansion: mlAst.Expansion, context: any): any {
  }

  visitExpansionCase(expansionCase: mlAst.ExpansionCase, context: any): any {
  }

  private extractInnerText(element: mlAst.Element) {

    const innerTextStart = element.startSourceSpan!.end.offset;
    const innerTextEnd = element.endSourceSpan!.start.offset;
    const content = element.startSourceSpan!.start.file.content;
    const innerText = content.slice(innerTextStart, innerTextEnd);

    return innerText;
  }

}