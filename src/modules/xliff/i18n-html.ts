import * as mlAst from "../ngc/ml_parser/ast";
import { XmlParser } from "../ngc/ml_parser/xml_parser";
import { StringUtils } from "../common/string.util";
import { serialize } from "../ngc/i18n/serializers/xml_helper";

const _ROOT_TAG = "root";
const _PLACEHOLDER_TAG = 'x';



export class I18nHtml {

  static parseIntoIdentifier(html: string): string {
    const parts = I18nHtml.parseIntoParts(html);
    return I18nHtml.buildIdentifier(parts);
  }

  static parseIntoParts(html: string): i18n.I18nHtmlPart[] {
    const parser = new I18nHtmlPartParser();
    const parts = parser.parse(html);
    return parts;
  }

  static buildIdentifier(parts: i18n.I18nHtmlPart[]): string {
    return parts.map(x => x.identifier).join('');
  }

}

class I18nHtmlPartParser implements mlAst.Visitor {
  private readonly _xmlParser: XmlParser;
  // fields
  private _parts !: i18n.I18nHtmlPart[];

  constructor() {
    this._xmlParser = new XmlParser();
  }

  parse(i18nHtml: string): i18n.I18nHtmlPart[] {
    const parseResult = this._xmlParser.parse(`<${_ROOT_TAG}>${i18nHtml}</${_ROOT_TAG}>`, '', { tokenizeExpansionForms: true });
    if (parseResult.errors.length > 0) {
      throw new Error(`Failed to build i18n html part. Html: ${i18nHtml}`);
    }
    mlAst.visitAll(this, parseResult.rootNodes, null);
    return this._parts;
  }

  visitElement(element: mlAst.Element, context: any): any {
    switch (element.name) {
      case _ROOT_TAG:
        this._parts = [];
        mlAst.visitAll(this, element.children, null);
        break;
      case _PLACEHOLDER_TAG:
        const phPart = this.buildPlaceholderPart(element);
        this._parts.push(phPart);
        break;
      default:
        break;
    }
  }

  visitAttribute(attribute: mlAst.Attribute, context: any): any {
  }

  visitComment(comment: mlAst.Comment, context: any): any {
  }

  visitExpansion(expansion: mlAst.Expansion, context: any): any {
  }

  visitExpansionCase(expansionCase: mlAst.ExpansionCase, context: any): any {
  }

  visitText(text: mlAst.Text, context: any): any {
    const processed = StringUtils.trimAndRemoveLineWrapper(text.value);
    const textPart: i18n.I18nHtmlPart = {
      key: null,
      type: 'text',
      displayHtml: processed,
      rawHtml: processed,
      identifier: processed,
    };
    this._parts.push(textPart);
  }

  private buildPlaceholderPart(element: mlAst.Element): i18n.I18nHtmlPart {
    const phId = element.attrs.find(x => x.name === 'id')?.value ?? null;
    let placeContent = ``;
    if (phId?.startsWith('ICU')) {
      const icuContent = element.attrs.find(x => x.name === 'equiv-text')?.value;
      placeContent = `${phId}:${icuContent}`;
    } else if (
      phId?.startsWith('INTERPOLATION') || phId?.startsWith('START_TAG_') || phId?.startsWith('CLOSE_TAG_')
    ) {
      placeContent = phId;
    }
    const elTextStart = element.startSourceSpan!.start.offset;
    const elTextEnd = element.endSourceSpan!.end.offset;
    const content = element.startSourceSpan!.start.file.content;
    const elText = content.slice(elTextStart, elTextEnd);
    const identifier = `<${placeContent}>`;
    const phPart: i18n.I18nHtmlPart = {
      key: phId,
      type: 'ph_tag',
      displayHtml: `<i>${phId}</i>`,
      rawHtml: StringUtils.trimAndRemoveLineWrapper(elText),
      identifier: identifier,
    };
    return phPart;
  }
}



// class I18nHtmlIdentifierParser implements mlAst.Visitor {
//   private readonly _xmlParser: XmlParser;
//   private _results !: string[];

//   // fields
//   private _parts !: string[];

//   constructor() {
//     this._xmlParser = new XmlParser();
//   }

//   parse(i18nHtml: string): string {
//     const parseResult = this._xmlParser.parse(`<${_ROOT_TAG}>${i18nHtml}</${_ROOT_TAG}>`, '', { tokenizeExpansionForms: true });
//     if (parseResult.errors.length > 0) {
//       throw new Error(`Failed to build trans unit html text identifier. Html: ${i18nHtml}`);
//     }
//     this._results = [];
//     mlAst.visitAll(this, parseResult.rootNodes, null);
//     return this._results[0];
//   }

//   visitElement(element: mlAst.Element, context: any): any {
//     switch (element.name) {
//       case _ROOT_TAG:
//         this._parts = [];
//         mlAst.visitAll(this, element.children, null);
//         this._results.push(this._parts.join(''));
//         break;
//       case _PLACEHOLDER_TAG:
//         const phIdentifier = this.buildPlaceholderIdentifier(element);
//         this._parts.push(phIdentifier);
//         break;
//       default:
//         break;
//     }
//   }

//   visitAttribute(attribute: mlAst.Attribute, context: any): any {
//   }

//   visitComment(comment: mlAst.Comment, context: any): any {
//   }

//   visitExpansion(expansion: mlAst.Expansion, context: any): any {
//   }

//   visitExpansionCase(expansionCase: mlAst.ExpansionCase, context: any): any {
//   }

//   visitText(text: mlAst.Text, context: any): any {
//     const processed = StringUtils.trimAndRemoveLineWrapper(text.value);
//     this._parts.push(processed);
//   }

//   private buildPlaceholderIdentifier(element: mlAst.Element): string {
//     const phId = element.attrs.find(x => x.name === 'id')?.value;
//     let placeContent = ``;
//     if (phId?.startsWith('ICU')) {
//       const icuContent = element.attrs.find(x => x.name === 'equiv-text')?.value;
//       placeContent = `${phId}:${icuContent}`;
//     } else if (
//       phId?.startsWith('INTERPOLATION') || phId?.startsWith('START_TAG_') || phId?.startsWith('CLOSE_TAG_')
//     ) {
//       placeContent = phId;
//     }
//     return `<${placeContent}>`;
//   }
// }


