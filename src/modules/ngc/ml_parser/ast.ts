import {ParseSourceSpan} from "../parse_util";
import {AST as I18nAST} from "../i18n/ast";

export interface Node {
  sourceSpan: ParseSourceSpan;

  visit(visitor: Visitor, context: any): any;
}

export class Text implements Node {
  constructor(public value: string, public sourceSpan: ParseSourceSpan, public i18n?: I18nAST) {
  }

  visit(visitor: Visitor, context: any): any {
    return visitor.visitText(this, context);
  }
}

export class Expansion implements Node {
  constructor(
    public switchValue: string, public type: string, public cases: ExpansionCase[],
    public sourceSpan: ParseSourceSpan, public switchValueSourceSpan: ParseSourceSpan,
    public i18n?: I18nAST) {
  }

  visit(visitor: Visitor, context: any): any {
    return visitor.visitExpansion(this, context);
  }
}

export class ExpansionCase implements Node {
  constructor(
    public value: string, public expression: Node[], public sourceSpan: ParseSourceSpan,
    public valueSourceSpan: ParseSourceSpan, public expSourceSpan: ParseSourceSpan) {
  }

  visit(visitor: Visitor, context: any): any {
    return visitor.visitExpansionCase(this, context);
  }
}

export class Attribute implements Node {
  constructor(
    public name: string, public value: string, public sourceSpan: ParseSourceSpan,
    public valueSpan?: ParseSourceSpan, public i18n?: I18nAST) {
  }

  visit(visitor: Visitor, context: any): any {
    return visitor.visitAttribute(this, context);
  }
}

export class Element implements Node {
  constructor(
    public name: string, public attrs: Attribute[], public children: Node[],
    public sourceSpan: ParseSourceSpan, public startSourceSpan: ParseSourceSpan | null = null,
    public endSourceSpan: ParseSourceSpan | null = null, public i18n?: I18nAST) {
  }

  visit(visitor: Visitor, context: any): any {
    return visitor.visitElement(this, context);
  }
}

export class Comment implements Node {
  constructor(public value: string | null, public sourceSpan: ParseSourceSpan) {
  }

  visit(visitor: Visitor, context: any): any {
    return visitor.visitComment(this, context);
  }
}

export interface Visitor {
  // Returning a truthy value from `visit()` will prevent `visitAll()` from the call to the typed
  // method and result returned will become the result included in `visitAll()`s result array.
  visit?(node: Node, context: any): any;

  visitElement(element: Element, context: any): any;

  visitAttribute(attribute: Attribute, context: any): any;

  visitText(text: Text, context: any): any;

  visitComment(comment: Comment, context: any): any;

  visitExpansion(expansion: Expansion, context: any): any;

  visitExpansionCase(expansionCase: ExpansionCase, context: any): any;
}


export function visitAll(visitor: Visitor, nodes: Node[], context: any = null): any[] {
  const result: any[] = [];

  const visit = visitor.visit ?
    (ast: Node) => visitor.visit !(ast, context) || ast.visit(visitor, context) :
    (ast: Node) => ast.visit(visitor, context);
  nodes.forEach(ast => {
    const astResult = visit(ast);
    if (astResult) {
      result.push(astResult);
    }
  });
  return result;
}