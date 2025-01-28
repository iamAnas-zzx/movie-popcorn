# React Movie App with Star Rating Feature

This project demonstrates the development of a React application that combines several key React concepts and features, such as state management, hooks (including custom hooks), and component reusability. Additionally, the project includes a reusable star rating component built with props for customization.

## Features

### 1. **Movie Management System**

- **Search Movies**: Users can search for movies using the search bar.
- **Select Movies**: Users can select a movie to view more details or close the selection.
- **Watched Movies List**: Maintain a list of movies that the user has watched.
- **Watched Summary**: Display a summary of the watched movies.
- **Error Handling**: Graceful handling of errors during data fetching.

### 2. **Star Rating Component**

- **Customizable Props**: Adjust properties like maximum rating, color, size, and default rating.
- **Hover Effect**: Preview the rating before final selection.
- **Dynamic Messages**: Display messages corresponding to the selected rating.
- **Reusable Design**: The component can be reused in multiple contexts with minimal adjustments.

---

## Concepts and Learnings

### 1. **React Hooks**

- **useState**: Used to manage local state within functional components.
- **useEffect**: Manage side effects like saving the watched movies to `localStorage`.
- **useRef**: Access and manage DOM elements directly, such as focusing the search input.
- **useCallback**: Optimize performance by memoizing callback functions to avoid unnecessary re-renders.

### 2. **Custom Hooks**

- **useMovies**: A hook to fetch movie data and manage loading and error states.
- **useLocalStorageState**: A custom hook to persist state in `localStorage`.
- **useKey**: A custom hook to handle key press events, such as focusing the search input on pressing "Enter."

### 3. **Prop Types**

- Leveraged `prop-types` to validate the props passed to components, ensuring correct usage and easier debugging.

### 4. **Reusable Components**

- Components like `NavBar`, `Main`, `Box`, and `StarRating` are designed to be generic and reusable in different parts of the application or future projects.

### 5. **Star Rating System**

- **Customizable Design**: The `StarRating` component uses props for dynamic customization.
  - `maxRating`: Number of stars in the rating system.
  - `color`: The color of the stars.
  - `size`: The size of the stars.
  - `messages`: Display messages for each rating level.
  - `onSetRating`: Callback function to handle rating changes.
- **Interactive UI**: Users can hover over stars to preview the rating and click to set it.

---

## Running the *Project*

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

---

## Example Usage

### StarRating Component

The `StarRating` component can be used in any part of the application as follows:

```jsx
<StarRating
  maxRating={5}
  color="#fcc419"
  size={24}
  messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
  defaultRating={3}
  onSetRating={(rating) => console.log(rating)}
/>
```

---

## Future Improvements

- Add backend integration for movie data.
- Enhance the styling with CSS frameworks like Tailwind or Material-UI.
- Implement user authentication for personalized watchlists.
- Extend the star rating system with half-star ratings.

---

## Conclusion

This project serves as a comprehensive example of building a React application with practical features like custom hooks, reusable components, and state management. It emphasizes creating modular and scalable code that can be easily extended for future requirements.

