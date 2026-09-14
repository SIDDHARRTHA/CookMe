import andamanAndNicobarIslands from "./recipes/recipes.andaman-and-nicobar-islands.json";
import andhraPradesh from "./recipes/recipes.andhra-pradesh.json";
import arunachalPradesh from "./recipes/recipes.arunachal-pradesh.json";
import assam from "./recipes/recipes.assam.json";
import bihar from "./recipes/recipes.bihar.json";
import chandigarh from "./recipes/recipes.chandigarh.json";
import chhattisgarh from "./recipes/recipes.chhattisgarh.json";
import dadra from "./recipes/recipes.dadra-and-nagar-haveli-and-daman-and-diu.json";
import delhi from "./recipes/recipes.delhi.json";
import goa from "./recipes/recipes.goa.json";
import gujarat from "./recipes/recipes.gujarat.json";
import haryana from "./recipes/recipes.haryana.json";
import himachalPradesh from "./recipes/recipes.himachal-pradesh.json";
import jammuAndKashmir from "./recipes/recipes.jammu-and-kashmir.json";
import jharkhand from "./recipes/recipes.jharkhand.json";
import karnataka from "./recipes/recipes.karnataka.json";
import kerala from "./recipes/recipes.kerala.json";
import ladakh from "./recipes/recipes.ladakh.json";
import lakshadweep from "./recipes/recipes.lakshadweep.json";
import madhyaPradesh from "./recipes/recipes.madhya-pradesh.json";
import maharashtra from "./recipes/recipes.maharashtra.json";
import manipur from "./recipes/recipes.manipur.json";
import meghalaya from "./recipes/recipes.meghalaya.json";
import mizoram from "./recipes/recipes.mizoram.json";
import nagaland from "./recipes/recipes.nagaland.json";
import odisha from "./recipes/recipes.odisha.json";
import puducherry from "./recipes/recipes.puducherry.json";
import punjab from "./recipes/recipes.punjab.json";
import rajasthan from "./recipes/recipes.rajasthan.json";
import sikkim from "./recipes/recipes.sikkim.json";
import tamilNadu from "./recipes/recipes.tamil-nadu.json";
import telangana from "./recipes/recipes.telangana.json";
import tripura from "./recipes/recipes.tripura.json";
import uttarPradesh from "./recipes/recipes.uttar-pradesh.json";
import uttarakhand from "./recipes/recipes.uttarakhand.json";
import westBengal from "./recipes/recipes.west-bengal.json";

const allIndiaRecipes = [
  ...andamanAndNicobarIslands,
  ...andhraPradesh,
  ...arunachalPradesh,
  ...assam,
  ...bihar,
  ...chandigarh,
  ...chhattisgarh,
  ...dadra,
  ...delhi,
  ...goa,
  ...gujarat,
  ...haryana,
  ...himachalPradesh,
  ...jammuAndKashmir,
  ...jharkhand,
  ...karnataka,
  ...kerala,
  ...ladakh,
  ...lakshadweep,
  ...madhyaPradesh,
  ...maharashtra,
  ...manipur,
  ...meghalaya,
  ...mizoram,
  ...nagaland,
  ...odisha,
  ...puducherry,
  ...punjab,
  ...rajasthan,
  ...sikkim,
  ...tamilNadu,
  ...telangana,
  ...tripura,
  ...uttarPradesh,
  ...uttarakhand,
  ...westBengal,
];

const ALLOWED_DIETS = [
  "Vegetarian",
  "Non-Vegetarian",
  "Eggetarian"
];

export const recipes = allIndiaRecipes.filter(
  (recipe) =>
    ALLOWED_DIETS.includes(recipe.diet)
);

export default recipes;