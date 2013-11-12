// {
//   productId: id,
//   companyId: id
// }
ProductCompany = new Meteor.Collection('productCompany');

// {
// 	code: int,
// 	description: string,
// 	type: string,
// 	parent: id
// }
Categories = new Meteor.Collection('categories');

// {
// 	address: string,
// 	description: string,
// 	name: string,
// 	phone: string,
// 	slug: string,
// 	website: url
// }
Companies = new Meteor.Collection('companies');

// {
// "brickId": MONGO ID OF BRICK
// "gtin": GTIN NUMBER HERE,
// "product_data": {
//     "department": null,
//     "indications_copy": null,
//     "alt_product_name": null,
//     "qc_holding_flag": "0",
//     "nutrition_count": "1",
//     "mfr_approved_date": "10/21/2013",
//     "keywords": null,
//     "guarantees": null,
//     "whole_upc": "027815002067",
//     "section_name": "G220 PANCAKE & WAFFLE MIXES",
//     "kp_base_id": "11606927",
//     "instructions_count": "2",
//     "diabetes_fc_values": null,
//     "category": null,
//     "peg_down": null,
//     "walmart_search_description": null,
//     "gpc_brick_name": "Bread (Perishable)",
//     "brand_name": "ARMOUR",
//     "consumable": "Yes",
//     "drpepper_category": null,
//     "division_name": null,
//     "variant_name_1": null,
//     "case_height": null,
//     "division_name_2": null,
//     "job_number": "417402",
//     "gluten_free": "No",
//     "case_gtin": null,
//     "identifier_1": null,
//     "unit_size": null,
//     "gpc_attributes_assigned": null,
//     "fat_free": "No",
//     "shelfman_flag": null,
//     "walmart_long_desc_header": null,
//     "interactions_copy": null,
//     "post_consumer": null,
//     "case_depth": null,
//     "capture_date": null,
//     "unit_uom": null,
//     "custom_product_name": "ArmourÂ® Breakfast Makersâ„¢ French Toast Sticks 3.0 oz. Tray",
//     "ss_claim_1": null,
//     "override_manufacturer_tasks": null,
//     "vm_claim_2": null,
//     "walmart_upc": null,
//     "mars_petcare_flag": "0",
//     "size_description_1": null,
//     "nutrition_head_1": null,
//     "alt_brand_name": null,
//     "physical_weight_oz": null,
//     "nutrient_claim_3": null,
//     "height": "5.891",
//     "legacy_brand_id": "141081",
//     "peg_right": null,
//     "us_foods_flag": "0",
//     "product_count": null,
//     "nutrient_claim_1": null,
//     "nutrient_claim_8": null,
//     "extra_text_2": null,
//     "manufacturer_keywords": null,
//     "model": null,
//     "no_data_flag": null,
//     "long_upc": null,
//     "vm_claim_4": null,
//     "ss_claim_3": null,
//     "advertising_flag": null,
//     "tray_width": null,
//     "acosta_flag": "0",
//     "additional_content_kpl_flag": null,
//     "depth_nesting": null,
//     "multiple_shelf_facings": "1",
//     "noncontract_flag": "0",
//     "walmart_manufacturer_id": null,
//     "knsl_flag": null,
//     "tray_height": null,
//     "nutrient_claim_4": null,
//     "vm_type_1": null,
//     "profile_base_id": "11614271",
//     "brand_id": "461332",
//     "product_created_date": "08/28/2013 14:49:54",
//     "ethnic_copy": null,
//     "is_variant_flag": null,
//     "primary_gtin": null,
//     "last_publish_date": "10/21/2013 00:00:00",
//     "country_id": "1",
//     "logo_flag": null,
//     "km_base_id": "421861",
//     "sensible_solutions": "No Flag",
//     "disease_claim": null,
//     "variant_value_2": null,
//     "size_description_2": null,
//     "gs1_retail_flag": "0",
//     "additional_content_midn_flag": null,
//     "vm_type_3": null,
//     "old_mfr_id": null,
//     "tray_depth": null,
//     "section_id": "G220",
//     "nutrient_claim_6": null,
//     "ingredients": "French Toast Sticks: Yellow Bread (Enriched Wheat Flour [Flour, Malted Barley Flour, Reduced Iron, Niacin, Thiamine Mononitrate, Riboflavin, Folic Acid], Water, High Fructose Corn Syrup, Yeast, Soybean Oil, Salt, Corn Flour, Mono- and Diglycerides, Calcium Propionate, DATEM, Calcium Sulfate, Spices, Coloring, Soy Lecithin, Natural and Artificial Flavor, Soy Flour), Water, Batter (Bleached Wheat Flour, Sugar, Dextrose, Whole Egg Solids, Yellow Corn Flour, Corn Syrup Solids, Natural Flavor, Modified Corn Starch, Salt, Leaving [Sodium Aluminum Phosphate, Sodium Bicarbonate], Nonfat Dry Milk, Spice, Artificial Flavor, Carbohydrate Gum, Silicon Dioxide [To Preserve Caking], Soybean Oil. Maple Flavored Syrup: High Fructose Corn Syrup, Corn Syrup, Water, Sugar, Natural Flavor, Salt, Potassium Sorbate (Preservative), Citric Acid, Sodium Hexametaphosphate, Polysorbate 60.",
//     "costco_flag": null,
//     "pch_sequence": null,
//     "tray_count": null,
//     "vm_type_4": null,
//     "unit_container": null,
//     "variant_name_2": null,
//     "primary_version": null,
//     "legacy_mfr_id": "141080",
//     "height_count": null,
//     "old_brand_id": null,
//     "manufacturer_id": "421861",
//     "legal": "Distributed By: Armour-Eckrich Meats LLC, P.O. Box 405020, Cincinnati, OH 452040. Amour is a registered trademark of Jonmor Investments, Inc. www.lunchmaker.com.",
//     "nutrient_claim_5": null,
//     "low_fat": "No",
//     "nutrient_claim_2": null,
//     "gpc_brick_id": "10000164",
//     "kb_base_id": "461332",
//     "display_depth": null,
//     "ss_claim_2": null,
//     "kpl_flag": null,
//     "description": "French Toast Sticks",
//     "width_count": null,
//     "language_id": null,
//     "legacy_upc": "2781500206",
//     "physical_weight_lb": null,
//     "romance_copy_category": null,
//     "width": "4.897",
//     "nutrition_footnotes_2": null,
//     "vm_claim_1": null,
//     "product_varietal": null,
//     "food_service_public_flag": "0",
//     "image_indicator": "3",
//     "product_type": null,
//     "seasonal_flag": null,
//     "domain": "kwikee",
//     "additional_content_kidn_flag": null,
//     "product_base_id": "11606927",
//     "container_type": "TRAY",
//     "legacy_product_id": "11606927",
//     "product_id": null,
//     "kwikee_why_buy": ["Dunk 'Em!", "French Toast Sticks, Maple Flavored Syrup", null, null, null, null, null],
//     "alt_product_size": null,
//     "identifier_2": null,
//     "cokesm_flag": "0",
//     "primary_type": null,
//     "del_monte_flag": "0",
//     "ingredient_code": null,
//     "package": null,
//     "extra_text_4": null,
//     "promotion": "Default",
//     "kls_flag": "1",
//     "alt_container_type": null,
//     "shipment_id": null,
//     "guarantee_analysis": null,
//     "dollargeneral_flag": "0",
//     "vertical_nesting": null,
//     "display_width": null,
//     "walmart_brand_id": null,
//     "warnings_copy": null,
//     "supplemental_facts": "\u0005\u0007\u0005",
//     "product_name": "Breakfast Makers",
//     "alt_product_description": null,
//     "allergens": "Contains egg, milk, soy, wheat.",
//     "vm_claim_3": null,
//     "kwikee_instruction": [null, "Keep refrigerated.", null, null, null],
//     "extra_text_3": null,
//     "case_count": null,
//     "hexcode": null,
//     "variant_value_1": null,
//     "organic": "0",
//     "alt_uom": null,
//     "kosher": "0",
//     "account_base_id": "8927462",
//     "kidn_flag": null,
//     "midn_flag": "1",
//     "nutrition_footnotes_1": null,
//     "depth": "1.094",
//     "case_width": null,
//     "depth_count": null,
//     "upc_10": "2781500206",
//     "contract_status": null,
//     "romance_line_count": "1",
//     "nutrition_head_2": null,
//     "ss_claim_4": null,
//     "brand_keywords": "armer\narmur\narmor\narmmer\narmmor",
//     "manufacturer_name": "ARMOUR-ECKRICH MEATS, LLC",
//     "uom": "OZ",
//     "dollar_general_flag": null,
//     "nutrient_claim_7": null,
//     "why_buy_count": "2",
//     "gtin": "00027815002067",
//     "walmart_flag": "0",
//     "kwikee_nutrition": [
//         [{
//             "children": [{
//                 "amount": "0",
//                 "uom": "G",
//                 "label": "Serving Size"
//             }, {
//                 "amount": "0",
//                 "label": "Servings per Container"
//             }, {
//                 "amount": "1 Package",
//                 "label": "Amount per Serving"
//             }],
//             "section": "servings"
//         }, {
//             "children": [{
//                 "amount": "250",
//                 "children": [{
//                     "amount": "70",
//                     "label": "Calories from Fat"
//                 }],
//                 "label": "Calories"
//             }],
//             "section": "calories"
//         }, {
//             "children": [{
//                 "amount": "8",
//                 "uom": "G",
//                 "dvp": "12",
//                 "children": [{
//                     "amount": "1",
//                     "uom": "G",
//                     "dvp": "5",
//                     "label": "Saturated Fat"
//                 }, {
//                     "amount": "0",
//                     "uom": "G",
//                     "label": "Trans Fat"
//                 }],
//                 "label": "Total Fat"
//             }, {
//                 "amount": "10",
//                 "uom": "MG",
//                 "dvp": "3",
//                 "label": "Cholesterol"
//             }, {
//                 "amount": "240",
//                 "uom": "MG",
//                 "dvp": "10",
//                 "label": "Sodium"
//             }, {
//                 "amount": "41",
//                 "uom": "G",
//                 "dvp": "14",
//                 "children": [{
//                     "amount": "1",
//                     "uom": "G",
//                     "dvp": "4",
//                     "label": "Dietary Fiber"
//                 }, {
//                     "amount": "20",
//                     "uom": "G",
//                     "label": "Sugars"
//                 }],
//                 "label": "Total Carbohydrate"
//             }, {
//                 "amount": "3",
//                 "uom": "G",
//                 "label": "Protein"
//             }],
//             "section": "general"
//         }, {
//             "children": [{
//                 "dvp": "0",
//                 "label": "Vitamin A"
//             }, {
//                 "dvp": "0",
//                 "label": "Vitamin C"
//             }, {
//                 "dvp": "2",
//                 "label": "Calcium"
//             }, {
//                 "dvp": "6",
//                 "label": "Iron"
//             }],
//             "section": "vitamins"
//         }],
//         [],
//         [],
//         [],
//         [],
//         []
//     ],
//     "other_nutrient_statement": null,
//     "display_height": null,
//     "product_size": "3",
//     "upc_12": "027815002067",
//     "product_last_modified_date": "10/17/2013 09:33:53",
//     "archive_flag": "0",
//     "dual_nesting": null,
//     "vm_type_2": null,
//     "product_form": null,
//     "walmart_id": null,
//     "kwikee_romance": [null, null, null, null]
// },
// "ac": [],
// "related_products": [],
// "primary_views": [{
//     "asset_view_code": "CF",
//     "asset_type": null,
//     "large_preview_path": null,
//     "asset_base_id": "11653264",
//     "private_flag": 0,
//     "preview": "/ccs/f/0/0/0/0/0/2/0/1/1/2/0/2/0/1/2/2/2/1/0/0.GIF",
//     "type": "product",
//     "asset_version": null
// }, {
//     "asset_view_code": "SHELFMAN",
//     "asset_type": null,
//     "large_preview_path": null,
//     "asset_base_id": "11655919",
//     "private_flag": 0,
//     "preview": "/ccs/f/0/0/0/0/0/0/0/1/1/1/2/2/0/1/2/1/1/2/1/0.jpg",
//     "type": "product",
//     "asset_version": null
// }, {
//     "asset_view_code": "PV",
//     "asset_type": null,
//     "large_preview_path": null,
//     "asset_base_id": "11734315",
//     "private_flag": 0,
//     "preview": "/ccs/f/0/0/0/0/0/2/0/1/2/2/0/2/2/1/2/0/2/0/0/0.jpg",
//     "type": "product",
//     "asset_version": null
// }, {
//     "asset_view_code": "NF",
//     "asset_type": null,
//     "large_preview_path": null,
//     "asset_base_id": "11734314",
//     "private_flag": 0,
//     "preview": "/ccs/f/0/0/0/0/0/2/0/1/2/2/0/2/2/1/2/0/1/2/2/0.GIF",
//     "type": "product",
//     "asset_version": null
// }, {
//     "asset_view_code": "IN",
//     "asset_type": null,
//     "large_preview_path": null,
//     "asset_base_id": "11734313",
//     "private_flag": 0,
//     "preview": "/ccs/f/0/0/0/0/0/2/0/1/2/2/0/2/2/1/2/0/1/2/1/1.GIF",
//     "type": "product",
//     "asset_version": null
// }, {
//     "asset_view_code": "BC",
//     "asset_type": null,
//     "large_preview_path": null,
//     "asset_base_id": "11888940",
//     "private_flag": 0,
//     "preview": "/ccs/g/0/0/0/0/0/1/0/0/2/2/0/2/1/1/0/0/1/0/1/1.GIF",
//     "type": "product",
//     "asset_version": null
// }]
// }
Products = new Meteor.Collection('products');