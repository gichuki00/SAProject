const recipes = [
  {
    id: 1,
    title: "Classic Spaghetti Carbonara",
    description: "A creamy, dreamy pasta dish that's quick and easy to make. This Italian classic is perfect for a weeknight dinner or a special occasion.",
    image: "https://images.unsplash.com/photo-1612874742237-6526229898c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    prepTime: "10 mins",
    cookTime: "15 mins",
    servings: 4,
    difficulty: "Medium",
    rating: 4.8,
    category: "Dinner",
    ingredients: [
      "400g spaghetti",
      "200g pancetta or guanciale, diced",
      "4 large eggs",
      "100g pecorino cheese, grated",
      "100g parmesan, grated",
      "4 garlic cloves, crushed",
      "1 tsp black pepper",
      "Salt to taste",
      "Handful fresh parsley, chopped"
    ],
    instructions: [
      "Bring a large pot of salted water to boil and cook spaghetti according to package instructions until al dente.",
      "In a bowl, whisk together eggs, grated cheeses, and black pepper. Set aside.",
      "In a large pan, cook the pancetta over medium heat until crispy. Add garlic in the last 30 seconds of cooking.",
      "Drain the pasta, reserving 1 cup of pasta water.",
      "Working quickly, add the hot pasta to the pan with pancetta. Remove from heat.",
      "Pour the egg and cheese mixture over the pasta, tossing quickly to create a creamy sauce. Add pasta water a tablespoon at a time if needed.",
      "Season with salt if needed and serve immediately with extra cheese and parsley."
    ]
  },
  {
    id: 2,
    title: "Avocado and Egg Toast",
    description: "A nutritious and delicious breakfast that's packed with protein and healthy fats to start your day right.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    prepTime: "5 mins",
    cookTime: "5 mins",
    servings: 2,
    difficulty: "Easy",
    rating: 4.6,
    category: "Breakfast",
    ingredients: [
      "2 slices whole grain bread",
      "1 ripe avocado",
      "2 eggs",
      "1/2 lemon, juiced",
      "1/2 tsp red pepper flakes",
      "Salt and pepper to taste",
      "Fresh cilantro or parsley for garnish",
      "1 tbsp olive oil"
    ],
    instructions: [
      "Toast the bread until golden and crisp.",
      "In a small bowl, mash the avocado with lemon juice, salt, and pepper.",
      "Heat olive oil in a non-stick pan over medium heat. Crack the eggs into the pan and cook to your preference (sunny side up or over easy).",
      "Spread the mashed avocado evenly on the toast.",
      "Top each toast with a fried egg, sprinkle with red pepper flakes and fresh herbs.",
      "Season with additional salt and pepper if needed and serve immediately."
    ]
  },
  {
    id: 3,
    title: "Vegetable Stir Fry with Tofu",
    description: "A quick and healthy vegan dish packed with colorful vegetables and protein-rich tofu in a savory sauce.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    prepTime: "15 mins",
    cookTime: "15 mins",
    servings: 4,
    difficulty: "Easy",
    rating: 4.5,
    category: "Vegan",
    ingredients: [
      "1 block (400g) firm tofu, pressed and cubed",
      "2 tbsp cornstarch",
      "3 tbsp soy sauce",
      "2 tbsp maple syrup",
      "1 tbsp sriracha (optional)",
      "2 tbsp vegetable oil",
      "1 red bell pepper, sliced",
      "1 yellow bell pepper, sliced",
      "2 carrots, julienned",
      "2 cups broccoli florets",
      "3 garlic cloves, minced",
      "1 tbsp ginger, grated",
      "2 green onions, sliced",
      "Sesame seeds for garnish"
    ],
    instructions: [
      "In a small bowl, whisk together soy sauce, maple syrup, and sriracha. Set aside.",
      "Toss tofu cubes with cornstarch until evenly coated.",
      "Heat 1 tbsp oil in a large wok or pan over medium-high heat. Add tofu and cook until golden brown on all sides. Remove and set aside.",
      "Add remaining oil to the pan. Add garlic and ginger, stir for 30 seconds until fragrant.",
      "Add vegetables and stir-fry for 5-7 minutes until crisp-tender.",
      "Return tofu to the pan, pour the sauce over, and toss to combine. Cook for 2 more minutes.",
      "Garnish with green onions and sesame seeds. Serve hot over rice or noodles."
    ]
  },
  {
    id: 4,
    title: "Classic Chocolate Chip Cookies",
    description: "The perfect balance of crispy edges and chewy centers, these chocolate chip cookies are a timeless favorite.",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    prepTime: "15 mins",
    cookTime: "12 mins",
    servings: 24,
    difficulty: "Medium",
    rating: 4.9,
    category: "Dessert",
    ingredients: [
      "1 cup (225g) unsalted butter, softened",
      "3/4 cup (150g) granulated sugar",
      "3/4 cup (150g) packed brown sugar",
      "2 large eggs",
      "2 tsp vanilla extract",
      "2 1/4 cups (280g) all-purpose flour",
      "1 tsp baking soda",
      "1/2 tsp salt",
      "2 cups (350g) semi-sweet chocolate chips",
      "1 cup (120g) chopped walnuts (optional)"
    ],
    instructions: [
      "Preheat oven to 375°F (190°C). Line baking sheets with parchment paper.",
      "In a large bowl, cream together butter and both sugars until light and fluffy.",
      "Beat in eggs one at a time, then stir in vanilla.",
      "In a separate bowl, combine flour, baking soda, and salt. Gradually add to the butter mixture.",
      "Stir in chocolate chips and walnuts (if using).",
      "Drop by rounded tablespoons onto prepared baking sheets, spacing 2 inches apart.",
      "Bake for 9-11 minutes or until golden brown. Let cool on baking sheets for 2 minutes before removing to wire racks."
    ]
  },
  {
    id: 5,
    title: "Greek Salad with Lemon-Herb Dressing",
    description: "A refreshing and healthy salad with crisp vegetables, feta cheese, and a zesty lemon-herb dressing.",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    prepTime: "15 mins",
    cookTime: "0 mins",
    servings: 4,
    difficulty: "Easy",
    rating: 4.7,
    category: "Lunch",
    ingredients: [
      "1 large cucumber, diced",
      "4 large tomatoes, diced",
      "1 red onion, thinly sliced",
      "1 green bell pepper, diced",
      "1 cup Kalamata olives, pitted",
      "200g feta cheese, cubed",
      "2 tbsp extra virgin olive oil",
      "2 tbsp lemon juice",
      "1 tsp dried oregano",
      "1 garlic clove, minced",
      "Salt and pepper to taste",
      "Fresh parsley for garnish"
    ],
    instructions: [
      "In a large bowl, combine cucumber, tomatoes, red onion, bell pepper, and olives.",
      "In a small bowl, whisk together olive oil, lemon juice, oregano, garlic, salt, and pepper.",
      "Pour the dressing over the salad and toss gently to combine.",
      "Add the feta cheese cubes and gently mix.",
      "Let the salad sit for 10 minutes before serving to allow flavors to meld.",
      "Garnish with fresh parsley and serve with crusty bread if desired."
    ]
  },
  {
    id: 6,
    title: "Beef Bourguignon",
    description: "A rich and flavorful French stew made with tender beef, mushrooms, and red wine, perfect for a special dinner.",
    image: "https://images.unsplash.com/photo-1600891963746-9cf3618ddd7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    prepTime: "30 mins",
    cookTime: "3 hours",
    servings: 6,
    difficulty: "Hard",
    rating: 4.9,
    category: "Dinner",
    ingredients: [
      "1.5kg beef chuck, cut into 2-inch cubes",
      "200g bacon, diced",
      "2 onions, diced",
      "3 carrots, sliced",
      "3 garlic cloves, minced",
      "2 tbsp tomato paste",
      "2 tbsp all-purpose flour",
      "750ml red wine (Burgundy or Pinot Noir)",
      "500ml beef stock",
      "250g button mushrooms, halved",
      "20 pearl onions, peeled",
      "2 bay leaves",
      "1 tsp dried thyme",
      "Salt and pepper to taste",
      "Fresh parsley for garnish"
    ],
    instructions: [
      "Preheat oven to 325°F (160°C).",
      "In a large Dutch oven, cook bacon over medium heat until crispy. Remove with a slotted spoon and set aside.",
      "Pat beef dry and season with salt and pepper. Brown in batches in the bacon fat. Remove and set aside.",
      "In the same pot, sauté onions, carrots, and garlic until softened, about 5 minutes.",
      "Add tomato paste and cook for 1 minute. Stir in flour and cook for another minute.",
      "Pour in wine and beef stock, scraping up any browned bits from the bottom of the pot.",
      "Return beef and bacon to the pot. Add bay leaves and thyme. Bring to a simmer.",
      "Cover and transfer to the oven. Cook for 2.5 hours.",
      "Add mushrooms and pearl onions. Return to the oven for 30 more minutes.",
      "Season to taste with salt and pepper. Garnish with fresh parsley before serving."
    ]
  },
  {
    id: 7,
    title: "Blueberry Banana Smoothie Bowl",
    description: "A thick and creamy smoothie bowl topped with fresh fruits, nuts, and seeds for a nutritious breakfast or snack.",
    image: "https://images.unsplash.com/photo-1494597706935-a5e5d0ab4120?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    prepTime: "5 mins",
    cookTime: "0 mins",
    servings: 2,
    difficulty: "Easy",
    rating: 4.8,
    category: "Breakfast",
    ingredients: [
      "2 frozen bananas",
      "1 cup frozen blueberries",
      "1/2 cup Greek yogurt",
      "1/4 cup almond milk (or any milk of choice)",
      "1 tbsp honey or maple syrup (optional)",
      "1/2 tsp vanilla extract",
      "Toppings: fresh blueberries, banana slices, granola, chia seeds, almond slices, coconut flakes"
    ],
    instructions: [
      "In a high-powered blender, combine frozen bananas, blueberries, Greek yogurt, almond milk, honey, and vanilla extract.",
      "Blend until smooth and creamy, adding more milk if needed to reach desired consistency.",
      "Divide between two bowls and top with your favorite toppings.",
      "Serve immediately with a spoon."
    ]
  },
  {
    id: 8,
    title: "Homemade Margherita Pizza",
    description: "A classic Italian pizza with a thin crust, fresh tomatoes, mozzarella, and basil. Simple yet incredibly delicious.",
    image: "https://images.unsplash.com/photo-1574071318507-1abc9890b3b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    prepTime: "2 hours (includes dough rising)",
    cookTime: "15 mins",
    servings: 4,
    difficulty: "Medium",
    rating: 4.7,
    category: "Dinner",
    ingredients: [
      "For the dough:",
      "3 1/2 cups (440g) all-purpose flour",
      "1 tsp salt",
      "1 tsp sugar",
      "1 tbsp active dry yeast",
      "1 1/4 cups (300ml) warm water",
      "2 tbsp olive oil",
      "For the toppings:",
      "1/2 cup tomato sauce",
      "250g fresh mozzarella, sliced",
      "1 cup cherry tomatoes, halved",
      "Fresh basil leaves",
      "Olive oil for drizzling",
      "Salt and pepper to taste"
    ],
    instructions: [
      "In a small bowl, dissolve sugar in warm water. Sprinkle yeast on top and let sit for 5-10 minutes until foamy.",
      "In a large bowl, combine flour and salt. Make a well in the center and add the yeast mixture and olive oil.",
      "Mix until a dough forms, then knead on a floured surface for 5-7 minutes until smooth and elastic.",
      "Place dough in a greased bowl, cover with a towel, and let rise in a warm place for 1-1.5 hours or until doubled in size.",
      "Preheat oven to 475°F (245°C). If you have a pizza stone, place it in the oven to heat.",
      "Punch down the dough and divide into 2 equal portions. Roll out each portion on a floured surface to your desired thickness.",
      "Transfer dough to a pizza peel or baking sheet. Spread tomato sauce over the dough, leaving a border for the crust.",
      "Top with mozzarella slices and cherry tomatoes. Drizzle with olive oil and season with salt and pepper.",
      "Bake for 12-15 minutes until the crust is golden and the cheese is bubbly.",
      "Remove from oven and top with fresh basil leaves. Slice and serve hot."
    ]
  }
];

// Categories for filtering
const categories = [
  { id: 1, name: 'All', count: recipes.length },
  { id: 2, name: 'Breakfast', count: recipes.filter(recipe => recipe.category === 'Breakfast').length },
  { id: 3, name: 'Lunch', count: recipes.filter(recipe => recipe.category === 'Lunch').length },
  { id: 4, name: 'Dinner', count: recipes.filter(recipe => recipe.category === 'Dinner').length },
  { id: 5, name: 'Dessert', count: recipes.filter(recipe => recipe.category === 'Dessert').length },
  { id: 6, name: 'Vegan', count: recipes.filter(recipe => recipe.category === 'Vegan').length },
];

// Difficulty levels
const difficulties = [
  { id: 1, name: 'All', count: recipes.length },
  { id: 2, name: 'Easy', count: recipes.filter(recipe => recipe.difficulty === 'Easy').length },
  { id: 3, name: 'Medium', count: recipes.filter(recipe => recipe.difficulty === 'Medium').length },
  { id: 4, name: 'Hard', count: recipes.filter(recipe => recipe.difficulty === 'Hard').length },
];

export { recipes, categories, difficulties };
