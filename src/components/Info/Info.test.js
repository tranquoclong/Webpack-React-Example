import React from 'react'
import { render, fireEvent, screen, cleanup } from '@testing-library/react'
import Info from './Info'

afterEach(cleanup)

test('text in state is changed when button clicked', () => {
    render(<Info />)
    
    expect(screen.getByText(/Initial/i).textContent).toBe("Initial State")
    
    fireEvent.click(screen.getByText("State Change Button"))

    expect(screen.getByText(/Initial/i).textContent).toBe("Initial State Changed")
})

// test('button click changes props', () => {
//     render(<App><TestHook/></App>)

//     expect(screen.getByText(/Moe/i).textContent).toBe("Moe")

//     fireEvent.click(screen.getByText("Change Name"))

//     expect(screen.getByText(/Steve/i).textContent).toBe("Steve")
// })

// test("button has correct initial color", () => {
//   render(<App />);
//   const colorButton = screen.getByRole("button", { name: "Change to blue" });

//   expect(colorButton).toHaveStyle({ backgroundColor: "red" });

//   fireEvent.click(colorButton);

//   expect(colorButton).toHaveStyle({ backgroundColor: "blue" });

//   expect(colorButton.textContent).toBe("Change to red");
// });