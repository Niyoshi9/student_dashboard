jest.mock("./supabase" , () => ({
    supabase: {
        from: jest.fn(),
    },
}));

import { fireEvent, render,screen,waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Courses from "./courses";
import { supabase } from "./supabase";

const courses = [
    {
        id:1,
        title: "Course 1",
        progress: 50,
        user_id: "123",
    },
    {
        id:2,
        title: "Course 2",
        progress: 75,
        user_id: "123",
    },
];

test("fetches and displays courses", async () => {
    const mockEq = jest.fn().mockResolvedValue({ 
        data: courses,
        error: null 
    });

    const mockSelect = jest.fn(() => ({
        eq: mockEq,
    }));

    supabase.from.mockReturnValue({
        select: mockSelect,
    });

    const user = {
        id: "123",
    };

    render(<Courses user={user} />);

    // Courses are displayed
    expect(await screen.findByText("Course 1")).toBeInTheDocument();
    expect(await screen.findByText("Course 2")).toBeInTheDocument();

    //Correct table is used
    expect(supabase.from).toHaveBeenCalledWith("courses");

    //Correct columns are selected
    expect(mockSelect).toHaveBeenCalledWith("*");

    //Correct user filter is applied
    expect(mockEq).toHaveBeenCalledWith("user_id","123");
});

test ("handles error when fetching courses", async () => {
    const error = new Error("Failed to fetch courses");

    const mockEq = jest.fn().mockResolvedValue({
        data: null,
        error: error,
    });

    const mockSelect = jest.fn(() => ({
        eq:mockEq,
    }));

    supabase.from.mockReturnValue({
        select: mockSelect,
    });

    //replaces console.log with a mock function to capture the erroe msg.
    const consoleSpy = jest.spyOn(console,"log").mockImplementation();

    const user = {
        id: "123",
    };

    render(<Courses user={user} />);

    await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(error);
    });

    expect(screen.queryByText("Course 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Course 2")).not.toBeInTheDocument();

    consoleSpy.mockRestore();
});

test("adding a new course", async () => {
    

    const mockEq = jest.fn().mockResolvedValue({
        data: [],
        error: null,
    });
    const mockSelect = jest.fn(() => ({
        eq: mockEq,
    }));

    const mockInsert = jest.fn().mockResolvedValue({
        data: null,
        error: null,
    });

    supabase.from.mockImplementation((table) => {
        if(table === "courses")
        {
            return {
                select: mockSelect,
                insert: mockInsert,
            };
        }
    });

    render(<Courses user={{id: "123"}} />);

    const input = screen.getByPlaceholderText("Course name");

     fireEvent.change(input, {
        target: { value: "New Course" },
    });


    const button = screen.getByRole("button", {name: "Add course"});

    fireEvent.click(button);

    expect(mockInsert).toHaveBeenCalledWith({
        title: "New Course",
        progress: 0,
        user_id: "123",
    });

    await waitFor(() => {
        expect(input).toHaveValue("");
    });
});

test ()
