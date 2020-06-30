import { I18nError } from "../ngc/i18n/parse_util";
import * as mlAst from "../ngc/ml_parser/ast";
import * as i18nAst from "../ngc/i18n/ast";
import * as xml from "../ngc/i18n/serializers/xml_helper";
import { XmlParser } from "../ngc/ml_parser/xml_parser";
import { StringUtils } from "../common/string.util";

const _VERSION = '1.2';
const _XMLNS = 'urn:oasis:names:tc:xliff:document:1.2';
const _PLACEHOLDER_TAG = 'x';

const _FILE_TAG = 'file';
const _SOURCE_TAG = 'source';
const _SEGMENT_SOURCE_TAG = 'seg-source';
const _ALT_TRANS_TAG = 'alt-trans';
const _TARGET_TAG = 'target';
const _UNIT_TAG = 'trans-unit';
const _CONTEXT_GROUP_TAG = 'context-group';
const _CONTEXT_TAG = 'context';


enum ContextTypeEnum {
  SOURCE_FILE = 'sourcefile',
  LINE_NUMBER = 'linenumber'
}

export interface IXliffContextGroup {
  sourcefile: string;
  linenumber: number;
}

export interface IXliffTransUnitContent {
  id: string;
  srcHtml: string;
  tarHtml: string;
  description: string;
  meaning: string;
  ctxGroups: IXliffContextGroup[];
}

export interface IXliffTransUnitLoadResult {
  sourceLocale: string,
  targetLocale: string,
  transUnitByMsgId: { [msgId: string]: IXliffTransUnitContent },
  errors?: I18nError[],
}

export class Xliff {

  /**
   * Write trans units to xliff.
   *
   * @param items
   * @param sourceLocale
   * @param targetLocale
   * @param simplifyMode when `true`: will not write context groups, description and meanding into the xliff content.
   */
  static writeTransUnits(
    items: IXliffTransUnitContent[],
    sourceLocale: string,
    targetLocale: string,
    simplifyMode: boolean = false
  ): string {
    const transUnits: xml.Node[] = [];

    items.forEach(item => {
      const transUnit = new xml.Tag(_UNIT_TAG, { id: item.id, datatype: 'html' });

      const sourceTextNode = new xml.Text('');
      sourceTextNode.value = item.srcHtml;

      transUnit.children.push(
        new xml.CR(8), new xml.Tag(_SOURCE_TAG, {}, [sourceTextNode]),
      );

      if (item.tarHtml) {
        const targetTextNode = new xml.Text('');
        targetTextNode.value = item.tarHtml;
        transUnit.children.push(
          new xml.CR(8), new xml.Tag(_TARGET_TAG, {}, [targetTextNode]),
        )
      }

      if (!simplifyMode) {
        let contextTags: xml.Node[] = [];
        item.ctxGroups.forEach((ctxGroup) => {
          let contextGroupTag = new xml.Tag(_CONTEXT_GROUP_TAG, { purpose: 'location' });
          contextGroupTag.children.push(
            new xml.CR(10),
            new xml.Tag(
              _CONTEXT_TAG, { 'context-type': 'sourcefile' }, [new xml.Text(ctxGroup.sourcefile)]
            ),
            new xml.CR(10),
            new xml.Tag(
              _CONTEXT_TAG, { 'context-type': 'linenumber' }, [new xml.Text(`${ctxGroup.linenumber}`)]
            ),
            new xml.CR(8),
          );
          contextTags.push(new xml.CR(8), contextGroupTag);
        });

        transUnit.children.push(...contextTags);

        if (item.description) {
          transUnit.children.push(
            new xml.CR(8),
            new xml.Tag(
              'note', { priority: '1', from: 'description' }, [new xml.Text(item.description)]));
        }

        if (item.meaning) {
          transUnit.children.push(
            new xml.CR(8),
            new xml.Tag('note', { priority: '1', from: 'meaning' }, [new xml.Text(item.meaning)]));
        }
      }

      transUnit.children.push(new xml.CR(6));
      transUnits.push(new xml.CR(6), transUnit);
    });

    const body = new xml.Tag('body', {}, [...transUnits, new xml.CR(4)]);

    const fileAttr: { [name: string]: string } = {
      'source-language': sourceLocale,
    };

    if (targetLocale) {
      fileAttr['target-language'] = targetLocale;
    }

    const file = new xml.Tag(
      'file', {
      ...fileAttr,
      datatype: 'plaintext',
      original: 'ng2.template',
    },
      [new xml.CR(4), body, new xml.CR(2)]);
    const xliff = new xml.Tag(
      'xliff', { version: _VERSION, xmlns: _XMLNS }, [new xml.CR(2), file, new xml.CR()]);

    return xml.serialize([
      new xml.Declaration({ version: '1.0', encoding: 'utf-8' }), new xml.CR(), xliff, new xml.CR()
    ]);
  }

  static loadTransUnits(content: string, url: string, ignoreErrors: boolean = false) {
    const xliffParser = new XliffParser();
    const {
      sourceLocale, targetLocale, transUnitByMsgId, errors
    } = xliffParser.parse(content, url);
    if (!ignoreErrors && errors.length > 0) {
      throw new Error(`xliff parse errors:\n${errors.join('\n')}`);
    }
    return { sourceLocale, targetLocale, transUnitByMsgId, errors: errors.length > 0 ? errors : null };
  }

}


class XliffParser implements mlAst.Visitor {
  private _unitMlId !: string | null;
  private _unitMlSourceString !: string | null;
  private _unitMlTargetString !: string | null;
  private _unitMlDescription !: string | null;
  private _unitMlMeaning !: string | null;
  private _unitMlContextGroups !: IXliffContextGroup[];

  private _unitMlCtxGroupSrcFile !: string | null;
  private _unitMlCtxGroupLineNumber !: number | null;

  // TODO(issue/24571): remove '!'.
  private _errors !: I18nError[];
  // TODO(issue/24571): remove '!'.
  private _transUnitByMsgId !: { [msgId: string]: IXliffTransUnitContent };

  private _locale: string | null = null;
  private _srcLocale: string | null = null;

  parse(xliff: string, url: string) {
    this._unitMlSourceString = null;
    this._unitMlTargetString = null;
    this._transUnitByMsgId = {};

    const xml = new XmlParser().parse(xliff, url);

    this._errors = xml.errors;
    mlAst.visitAll(this, xml.rootNodes, null);

    return {
      transUnitByMsgId: this._transUnitByMsgId,
      errors: this._errors,
      targetLocale: this._locale,
      sourceLocale: this._srcLocale,
    };
  }



  visitElement(element: mlAst.Element, context: any): any {
    switch (element.name) {
      case _UNIT_TAG:
        this._unitMlId = null!;
        this._unitMlSourceString = null!;
        this._unitMlTargetString = null!;
        this._unitMlDescription = null!;
        this._unitMlMeaning = null!;
        this._unitMlContextGroups = [];
        const idAttr = element.attrs.find((attr) => attr.name === 'id');
        if (!idAttr) {
          this._addError(element, `<${_UNIT_TAG}> misses the "id" attribute`);
        } else {
          this._unitMlId = idAttr.value;
          if (this._transUnitByMsgId.hasOwnProperty(this._unitMlId)) {
            this._addError(element, `Duplicated translations for msg ${this._unitMlId}`);
          } else {
            mlAst.visitAll(this, element.children, null);
            this._transUnitByMsgId[this._unitMlId] = {
              id: this._unitMlId,
              srcHtml: StringUtils.trimAndRemoveLineWrapper(this._unitMlSourceString),
              tarHtml: StringUtils.trimAndRemoveLineWrapper(this._unitMlTargetString),
              description: this._unitMlDescription,
              meaning: this._unitMlMeaning,
              ctxGroups: this._unitMlContextGroups
            };
            // else {
            //   this._addError(element, `Message ${id} misses a translation`);
            // }
          }
        }
        break;

      // ignore those tags
      case _SEGMENT_SOURCE_TAG:
      case _ALT_TRANS_TAG:
        break;

      case _SOURCE_TAG:
      case _TARGET_TAG:
      case _CONTEXT_TAG:
        const innerTextStart = element.startSourceSpan!.end.offset;
        const innerTextEnd = element.endSourceSpan!.start.offset;
        const content = element.startSourceSpan!.start.file.content;
        const innerText = content.slice(innerTextStart, innerTextEnd);
        if (element.name === _SOURCE_TAG) {
          this._unitMlSourceString = innerText;
        } else if (element.name === _TARGET_TAG) {
          this._unitMlTargetString = innerText;
        } else {
          // context tag
          const ctxTypeAttr = element.attrs.find((attr) => attr.name === 'context-type');
          if (ctxTypeAttr) {
            switch (ctxTypeAttr.value) {
              case ContextTypeEnum.SOURCE_FILE:
                this._unitMlCtxGroupSrcFile = innerText;
                break;
              case ContextTypeEnum.LINE_NUMBER:
                this._unitMlCtxGroupLineNumber = parseInt(innerText, 10);
                break;
              default:
                break;
            }
          }
        }
        break;

      case _CONTEXT_GROUP_TAG:
        this._unitMlCtxGroupSrcFile = null;
        this._unitMlCtxGroupLineNumber = null;
        mlAst.visitAll(this, element.children, null);
        if (typeof this._unitMlCtxGroupSrcFile === 'string' && this._unitMlCtxGroupLineNumber !== null) {
          this._unitMlContextGroups.push({
            sourcefile: this._unitMlCtxGroupSrcFile,
            linenumber: this._unitMlCtxGroupLineNumber
          });
        } else {
          this._addError(element, `Message ${this._unitMlId} misses a translation`);
        }
        break;


      case _FILE_TAG:
        const localeAttr = element.attrs.find((attr) => attr.name === 'target-language');
        const srcLocaleAttr = element.attrs.find((attr) => attr.name === 'source-language');
        if (localeAttr) {
          this._locale = localeAttr.value;
        }
        if (srcLocaleAttr) {
          this._srcLocale = srcLocaleAttr.value;
        }
        mlAst.visitAll(this, element.children, null);
        break;

      default:
        // TODO(vicb): assert file structure, xliff version
        // For now only recurse on unhandled nodes
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

  private _addError(node: mlAst.Node, message: string): void {
    this._errors.push(new I18nError(node.sourceSpan!, message));
  }
}

class I18nIdentifierParser implements i18nAst.Visitor {
  constructor() {
  }

  parse(nodes: i18nAst.Node[]) {
    const parts: string[] = [];
    nodes.forEach(node => node.visit(this, parts));
    return parts.join('');
  }

  visitContainer(container: i18nAst.Container, context?: string[]): any {
    const parts: string[] = this.serialize(container.children);
    context?.push(parts.join(''));
    return parts;
  }

  visitIcu(icu: i18nAst.Icu, context?: string[]): any {
    const icuIdtfr = `~<${icu.expressionPlaceholder}>~`;
    context?.push(icuIdtfr);
    return icuIdtfr;
  }

  visitIcuPlaceholder(ph: i18nAst.IcuPlaceholder, context?: string[]): any {

  }

  visitPlaceholder(ph: i18nAst.Placeholder, context?: string[]): any {
    const phIdtfr = `~<${ph.name}>~`;
    context?.push(phIdtfr);
    return phIdtfr;
  }

  visitTagPlaceholder(ph: i18nAst.TagPlaceholder, context?: string[]): any {
    const start = `~<${ph.startName}>~`;
    if (ph.isVoid) {
      context?.push(start);
      return;
    }
    const close = `~<${ph.closeName}>~`;

    const parts: string[] = this.serialize(ph.children);

    context?.push([
      start,
      ...parts,
      close
    ].join(''));
  }

  visitText(text: i18nAst.Text, context?: string[]): any {
    const txt = StringUtils.trimAndRemoveLineWrapper(text.value);
    context?.push(txt);
    return txt;
  }

  serialize(nodes: i18nAst.Node[]): string[] {
    const lines = nodes.map(node => {
      const innerParts: string[] = [];
      node.visit(this, innerParts);
      return innerParts.join('');
    });
    return lines;
  }
}