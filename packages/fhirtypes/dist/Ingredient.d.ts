/*
 * Generated by @medplum/generator
 * Do not edit manually.
 */

import { AdministrableProductDefinition } from './AdministrableProductDefinition';
import { CodeableConcept } from './CodeableConcept';
import { CodeableReference } from './CodeableReference';
import { Extension } from './Extension';
import { Identifier } from './Identifier';
import { ManufacturedItemDefinition } from './ManufacturedItemDefinition';
import { MedicinalProductDefinition } from './MedicinalProductDefinition';
import { Meta } from './Meta';
import { Narrative } from './Narrative';
import { Organization } from './Organization';
import { Ratio } from './Ratio';
import { RatioRange } from './RatioRange';
import { Reference } from './Reference';
import { Resource } from './Resource';

/**
 * An ingredient of a manufactured item or pharmaceutical product.
 */
export interface Ingredient {

  /**
   * This is a Ingredient resource
   */
  readonly resourceType: 'Ingredient';

  /**
   * The logical id of the resource, as used in the URL for the resource.
   * Once assigned, this value never changes.
   */
  id?: string;

  /**
   * The metadata about the resource. This is content that is maintained by
   * the infrastructure. Changes to the content might not always be
   * associated with version changes to the resource.
   */
  meta?: Meta;

  /**
   * A reference to a set of rules that were followed when the resource was
   * constructed, and which must be understood when processing the content.
   * Often, this is a reference to an implementation guide that defines the
   * special rules along with other profiles etc.
   */
  implicitRules?: string;

  /**
   * The base language in which the resource is written.
   */
  language?: string;

  /**
   * A human-readable narrative that contains a summary of the resource and
   * can be used to represent the content of the resource to a human. The
   * narrative need not encode all the structured data, but is required to
   * contain sufficient detail to make it &quot;clinically safe&quot; for a human to
   * just read the narrative. Resource definitions may define what content
   * should be represented in the narrative to ensure clinical safety.
   */
  text?: Narrative;

  /**
   * These resources do not have an independent existence apart from the
   * resource that contains them - they cannot be identified independently,
   * and nor can they have their own independent transaction scope.
   */
  contained?: Resource[];

  /**
   * May be used to represent additional information that is not part of
   * the basic definition of the resource. To make the use of extensions
   * safe and manageable, there is a strict set of governance  applied to
   * the definition and use of extensions. Though any implementer can
   * define an extension, there is a set of requirements that SHALL be met
   * as part of the definition of the extension.
   */
  extension?: Extension[];

  /**
   * May be used to represent additional information that is not part of
   * the basic definition of the resource and that modifies the
   * understanding of the element that contains it and/or the understanding
   * of the containing element's descendants. Usually modifier elements
   * provide negation or qualification. To make the use of extensions safe
   * and manageable, there is a strict set of governance applied to the
   * definition and use of extensions. Though any implementer is allowed to
   * define an extension, there is a set of requirements that SHALL be met
   * as part of the definition of the extension. Applications processing a
   * resource are required to check for modifier extensions.
   *
   * Modifier extensions SHALL NOT change the meaning of any elements on
   * Resource or DomainResource (including cannot change the meaning of
   * modifierExtension itself).
   */
  modifierExtension?: Extension[];

  /**
   * The identifier(s) of this Ingredient that are assigned by business
   * processes and/or used to refer to it when a direct URL reference to
   * the resource itself is not appropriate.
   */
  identifier?: Identifier;

  /**
   * The status of this ingredient. Enables tracking the life-cycle of the
   * content.
   */
  status?: 'draft' | 'active' | 'retired' | 'unknown';

  /**
   * The product which this ingredient is a constituent part of.
   */
  for?: Reference<MedicinalProductDefinition | AdministrableProductDefinition | ManufacturedItemDefinition>[];

  /**
   * A classification of the ingredient identifying its purpose within the
   * product, e.g. active, inactive.
   */
  role?: CodeableConcept;

  /**
   * A classification of the ingredient identifying its precise purpose(s)
   * in the drug product. This extends the Ingredient.role to add more
   * detail. Example: antioxidant, alkalizing agent.
   */
  function?: CodeableConcept[];

  /**
   * If the ingredient is a known or suspected allergen. Note that this is
   * a property of the substance, so if a reference to a
   * SubstanceDefinition is used to decribe that (rather than just a code),
   * the allergen information should go there, not here.
   */
  allergenicIndicator?: boolean;

  /**
   * The organization(s) that manufacture this ingredient. Can be used to
   * indicate:         1) Organizations we are aware of that manufacture
   * this ingredient         2) Specific Manufacturer(s) currently being
   * used         3) Set of organisations allowed to manufacture this
   * ingredient for this product         Users must be clear on the
   * application of context relevant to their use case.
   */
  manufacturer?: IngredientManufacturer[];

  /**
   * The substance that comprises this ingredient.
   */
  substance?: IngredientSubstance;
}

/**
 * The organization(s) that manufacture this ingredient. Can be used to
 * indicate:         1) Organizations we are aware of that manufacture
 * this ingredient         2) Specific Manufacturer(s) currently being
 * used         3) Set of organisations allowed to manufacture this
 * ingredient for this product         Users must be clear on the
 * application of context relevant to their use case.
 */
export interface IngredientManufacturer {

  /**
   * Unique id for the element within a resource (for internal references).
   * This may be any string value that does not contain spaces.
   */
  id?: string;

  /**
   * May be used to represent additional information that is not part of
   * the basic definition of the element. To make the use of extensions
   * safe and manageable, there is a strict set of governance  applied to
   * the definition and use of extensions. Though any implementer can
   * define an extension, there is a set of requirements that SHALL be met
   * as part of the definition of the extension.
   */
  extension?: Extension[];

  /**
   * May be used to represent additional information that is not part of
   * the basic definition of the element and that modifies the
   * understanding of the element in which it is contained and/or the
   * understanding of the containing element's descendants. Usually
   * modifier elements provide negation or qualification. To make the use
   * of extensions safe and manageable, there is a strict set of governance
   * applied to the definition and use of extensions. Though any
   * implementer can define an extension, there is a set of requirements
   * that SHALL be met as part of the definition of the extension.
   * Applications processing a resource are required to check for modifier
   * extensions.
   *
   * Modifier extensions SHALL NOT change the meaning of any elements on
   * Resource or DomainResource (including cannot change the meaning of
   * modifierExtension itself).
   */
  modifierExtension?: Extension[];

  /**
   * The way in which this manufacturer is associated with the ingredient.
   * For example whether it is a possible one (others allowed), or an
   * exclusive authorized one for this ingredient. Note that this is not
   * the manufacturing process role.
   */
  role?: 'allowed' | 'possible' | 'actual';

  /**
   * An organization that manufactures this ingredient.
   */
  manufacturer?: Reference<Organization>;
}

/**
 * The substance that comprises this ingredient.
 */
export interface IngredientSubstance {

  /**
   * Unique id for the element within a resource (for internal references).
   * This may be any string value that does not contain spaces.
   */
  id?: string;

  /**
   * May be used to represent additional information that is not part of
   * the basic definition of the element. To make the use of extensions
   * safe and manageable, there is a strict set of governance  applied to
   * the definition and use of extensions. Though any implementer can
   * define an extension, there is a set of requirements that SHALL be met
   * as part of the definition of the extension.
   */
  extension?: Extension[];

  /**
   * May be used to represent additional information that is not part of
   * the basic definition of the element and that modifies the
   * understanding of the element in which it is contained and/or the
   * understanding of the containing element's descendants. Usually
   * modifier elements provide negation or qualification. To make the use
   * of extensions safe and manageable, there is a strict set of governance
   * applied to the definition and use of extensions. Though any
   * implementer can define an extension, there is a set of requirements
   * that SHALL be met as part of the definition of the extension.
   * Applications processing a resource are required to check for modifier
   * extensions.
   *
   * Modifier extensions SHALL NOT change the meaning of any elements on
   * Resource or DomainResource (including cannot change the meaning of
   * modifierExtension itself).
   */
  modifierExtension?: Extension[];

  /**
   * A code or full resource that represents the ingredient's substance.
   */
  code?: CodeableReference;

  /**
   * The quantity of substance in the unit of presentation, or in the
   * volume (or mass) of the single pharmaceutical product or manufactured
   * item. The allowed repetitions do not represent different strengths,
   * but are different representations - mathematically equivalent - of a
   * single strength.
   */
  strength?: IngredientSubstanceStrength[];
}

/**
 * The quantity of substance in the unit of presentation, or in the
 * volume (or mass) of the single pharmaceutical product or manufactured
 * item. The allowed repetitions do not represent different strengths,
 * but are different representations - mathematically equivalent - of a
 * single strength.
 */
export interface IngredientSubstanceStrength {

  /**
   * Unique id for the element within a resource (for internal references).
   * This may be any string value that does not contain spaces.
   */
  id?: string;

  /**
   * May be used to represent additional information that is not part of
   * the basic definition of the element. To make the use of extensions
   * safe and manageable, there is a strict set of governance  applied to
   * the definition and use of extensions. Though any implementer can
   * define an extension, there is a set of requirements that SHALL be met
   * as part of the definition of the extension.
   */
  extension?: Extension[];

  /**
   * May be used to represent additional information that is not part of
   * the basic definition of the element and that modifies the
   * understanding of the element in which it is contained and/or the
   * understanding of the containing element's descendants. Usually
   * modifier elements provide negation or qualification. To make the use
   * of extensions safe and manageable, there is a strict set of governance
   * applied to the definition and use of extensions. Though any
   * implementer can define an extension, there is a set of requirements
   * that SHALL be met as part of the definition of the extension.
   * Applications processing a resource are required to check for modifier
   * extensions.
   *
   * Modifier extensions SHALL NOT change the meaning of any elements on
   * Resource or DomainResource (including cannot change the meaning of
   * modifierExtension itself).
   */
  modifierExtension?: Extension[];

  /**
   * The quantity of substance in the unit of presentation, or in the
   * volume (or mass) of the single pharmaceutical product or manufactured
   * item. Unit of presentation refers to the quantity that the item occurs
   * in e.g. a strength per tablet size, perhaps 'per 20mg' (the size of
   * the tablet). It is not generally normalized as a unitary unit, which
   * would be 'per mg').
   */
  presentationRatio?: Ratio;

  /**
   * The quantity of substance in the unit of presentation, or in the
   * volume (or mass) of the single pharmaceutical product or manufactured
   * item. Unit of presentation refers to the quantity that the item occurs
   * in e.g. a strength per tablet size, perhaps 'per 20mg' (the size of
   * the tablet). It is not generally normalized as a unitary unit, which
   * would be 'per mg').
   */
  presentationRatioRange?: RatioRange;

  /**
   * A textual represention of either the whole of the presentation
   * strength or a part of it - with the rest being in
   * Strength.presentation as a ratio.
   */
  textPresentation?: string;

  /**
   * The strength per unitary volume (or mass).
   */
  concentrationRatio?: Ratio;

  /**
   * The strength per unitary volume (or mass).
   */
  concentrationRatioRange?: RatioRange;

  /**
   * A textual represention of either the whole of the concentration
   * strength or a part of it - with the rest being in
   * Strength.concentration as a ratio.
   */
  textConcentration?: string;

  /**
   * For when strength is measured at a particular point or distance. There
   * are products where strength is measured at a particular point. For
   * example, the strength of the ingredient in some inhalers is measured
   * at a particular position relative to the point of aerosolization.
   */
  measurementPoint?: string;

  /**
   * The country or countries for which the strength range applies.
   */
  country?: CodeableConcept[];

  /**
   * Strength expressed in terms of a reference substance. For when the
   * ingredient strength is additionally expressed as equivalent to the
   * strength of some other closely related substance (e.g. salt vs. base).
   * Reference strength represents the strength (quantitative composition)
   * of the active moiety of the active substance. There are situations
   * when the active substance and active moiety are different, therefore
   * both a strength and a reference strength are needed.
   */
  referenceStrength?: IngredientSubstanceStrengthReferenceStrength[];
}

/**
 * Strength expressed in terms of a reference substance. For when the
 * ingredient strength is additionally expressed as equivalent to the
 * strength of some other closely related substance (e.g. salt vs. base).
 * Reference strength represents the strength (quantitative composition)
 * of the active moiety of the active substance. There are situations
 * when the active substance and active moiety are different, therefore
 * both a strength and a reference strength are needed.
 */
export interface IngredientSubstanceStrengthReferenceStrength {

  /**
   * Unique id for the element within a resource (for internal references).
   * This may be any string value that does not contain spaces.
   */
  id?: string;

  /**
   * May be used to represent additional information that is not part of
   * the basic definition of the element. To make the use of extensions
   * safe and manageable, there is a strict set of governance  applied to
   * the definition and use of extensions. Though any implementer can
   * define an extension, there is a set of requirements that SHALL be met
   * as part of the definition of the extension.
   */
  extension?: Extension[];

  /**
   * May be used to represent additional information that is not part of
   * the basic definition of the element and that modifies the
   * understanding of the element in which it is contained and/or the
   * understanding of the containing element's descendants. Usually
   * modifier elements provide negation or qualification. To make the use
   * of extensions safe and manageable, there is a strict set of governance
   * applied to the definition and use of extensions. Though any
   * implementer can define an extension, there is a set of requirements
   * that SHALL be met as part of the definition of the extension.
   * Applications processing a resource are required to check for modifier
   * extensions.
   *
   * Modifier extensions SHALL NOT change the meaning of any elements on
   * Resource or DomainResource (including cannot change the meaning of
   * modifierExtension itself).
   */
  modifierExtension?: Extension[];

  /**
   * Relevant reference substance.
   */
  substance?: CodeableReference;

  /**
   * Strength expressed in terms of a reference substance.
   */
  strengthRatio?: Ratio;

  /**
   * Strength expressed in terms of a reference substance.
   */
  strengthRatioRange?: RatioRange;

  /**
   * For when strength is measured at a particular point or distance.
   */
  measurementPoint?: string;

  /**
   * The country or countries for which the strength range applies.
   */
  country?: CodeableConcept[];
}
