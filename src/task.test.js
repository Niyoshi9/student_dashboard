jest.mock('./supabase', () => ({
  supabase: { from: jest.fn() },
}));
import { supabase } from './supabase';
import { waitForElementToBeRemoved ,render,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tasks from './tasks';

describe('Tasks', () => {
  // acts as a tiny fake database that persists between calls
  let mockTasksDB;

  beforeEach(() => {
    mockTasksDB = []; // reset before every test

    supabase.from.mockImplementation((table) => {
      if (table === 'tasks') {
        return {
          select: () => ({
            eq: () => Promise.resolve({ data: [...mockTasksDB], error: null }),//here there is no need to check auth().id and user.id because we are making a new database array for each test and we making dublicate database.
          }),
          insert: (row) => {
            mockTasksDB.push({ id: mockTasksDB.length + 1,completed : false, ...row });
            return Promise.resolve({ error: null });
          },
          update: (changes) =>({
            eq : (field,value) => {
                const taskIndex = mockTasksDB.find((t) => t.id === value);
                if(taskIndex) Object.assign(taskIndex, changes);
                return Promise.resolve({error: null});
            },
          }),
          delete: () => ({
            eq: (field, value) => {
                
                mockTasksDB=mockTasksDB.filter((t) =>t.id !== value);
                return Promise.resolve({ error: null });
            },
          }),
         
        }; 
      }
      if (table === 'courses') {
        return {
          select: () => ({
            eq: () => Promise.resolve({ data: [], error: null }),
          }),
          update : () =>({
            eq : () => Promise.resolve({error: null}),
          })
         
        };
      }
    });
  });

  it('displays a new task after clicking Add Task', async () => {
    render(<Tasks user={{ id: 'test-user-id' }} />);

    const input = screen.getByPlaceholderText('Task Name');
    await userEvent.type(input, 'Buy groceries');

    const addButton = screen.getByRole('button', { name: /add task/i });
    await userEvent.click(addButton);

    // wait for it to reappear via the re-fetch that follows the insert
    const newTask = await screen.findByText('Buy groceries');
    expect(newTask).toBeInTheDocument();
  });

  it('read :displays existing tasks on load', async () => {
    //send fake data before render

    mockTasksDB.push({ id : 1, task_name : 'existing task', completed : false });
    
    render(<Tasks user = {{id : 'test-user-id'}}/>);

    expect(await screen.findByText('existing task')).toBeInTheDocument();
  });

  it('updates task completion status' , async () => 
  {
    mockTasksDB.push({ id: 1, task_name : 'task_to_toggle',completed : false});

    render(<Tasks user = {{id : 'test-user-id'}}/>);
    await screen.findByText('task_to_toggle');

    const donebutton = screen.getByRole('button', {name : /done/i});
    await userEvent.click(donebutton);

    expect(await screen.findByRole('button' , {name: /undo/i})).toBeInTheDocument();
  });

  it('delete: removes a task from the screen' , async () => {
    mockTasksDB.push({ id: 1, task_name : 'task_to_delete' , completed : false});

    render(<Tasks user = {{ id: 'test-user-id'}}/>);

    await screen.findByText('task_to_delete');

    const deletebutton= screen.getByRole('button', {name: /delete/i});
    await userEvent.click(deletebutton);

    await waitForElementToBeRemoved(() => screen.queryByText('task_to_delete')); //let any pending updates finish

    
  });

  it('does not add an empty task', async () => {
    render(<Tasks user={{ id: 'test-user-id'}} /> );

    const addButton = screen.getByRole('button', {
      name: /add task/i
    });
    await userEvent.click(addButton);

    expect(mockTasksDB).toHaveLength(0); // no new task should be added
  });
});