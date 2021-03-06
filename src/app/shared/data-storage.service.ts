import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService){}

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http.put<Recipe[]>('https://ng-tummy-buddy-default-rtdb.firebaseio.com/recipes.json',
                  recipes)
                  .subscribe();
  }

  fetchRecipes() {
    this.http.get<Recipe[]>('https://ng-tummy-buddy-default-rtdb.firebaseio.com/recipes.json')
                    .pipe(map(recipes => {
                      return recipes.map(recipe => {
                        return {...recipe,
                          ingredients: recipe.ingredients ?
                                       recipe.ingredients :
                                       []
                                }
                      })
                    }))
                    .subscribe(
                    recipes => {
                      this.recipeService.setRecipes(recipes);
                    }
                  );
  }

}
