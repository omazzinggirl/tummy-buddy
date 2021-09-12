import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";


@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();
  // recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    // new Recipe(
    //   'Lasagna',
    //   'Loaded veggie classic with meat sauce',
    //   'https://insanelygoodrecipes.com/wp-content/uploads/2021/01/Homemade-Ground-Beef-Lasagna-with-Melted-Cheese.png',
    //   [
    //     new Ingredient('Onion', 2),
    //     new Ingredient('Bell Pepper', 3),
    //     new Ingredient('Tomato', 5)
    //   ]
    //   ),

    // new Recipe(
    //   'Tiramisu',
    //   'Italian, eggless with Amaretto and Orange',
    //   'https://www.foodnetwork.com/content/dam/images/food/video/0/02/026/0266/0266676.jpg',
    //    [
    //     new Ingredient('Coffee', 2),
    //     new Ingredient('Ladyfinger', 6),
    //     new Ingredient('Cheese', 3),
    //     new Ingredient('Milk', 2)
    //   ] )

  ];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToSL(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
