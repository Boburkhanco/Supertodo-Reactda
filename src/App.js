import { useState, useRef, useEffect } from "react"
import "./App.css";
import Content from "./Localization/content";

function App(){
  // Creating Todo and Local Storage 
  const [todo, setTodo] = useState(JSON.parse(window.localStorage.getItem( "todos")) || []);

  // Using Ref and Effect for Darkmode styles 
  const  darkModeBtn = useRef()
  // Modal Settings
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)

  // Darkmode Settings 
  const [darkmode, setDarkmode] = useState(false)


  // Language Settings
  const [lang, setLang] = useState('uz')

  // Delete Todo 
  const deleteTodo = (item) => {
    let confirmIt = window.confirm("Are you sure to delete this?")
    if(confirmIt == true){
      let filteredTodo = todo.filter((i) => i.id !== Number(item. id));
      setTodo(filteredTodo);
      window.localStorage.setItem("todos", JSON.stringify(filteredTodo));
    } else {
      return;
    }
  };

  // Check Todo with checkbox 
  const checkTodo = (e) =>{
    const todoId = e.target.dataset.id;
    const findTodo = todo.find((i) => i.id === Number (todoId));
    findTodo.isCompleted = !findTodo.isCompleted;
    setTodo([...todo]);
    window. localStorage.setItem("todos", JSON.stringify([...todo]));
  };

  // Add a new todo with "Enter"
  const createTodo = (e) => {
    console.log(e.target.value);
    if ((e.code === "Enter") && (e.target.value.length >= 3)) {
      let newTodo = {
        id: new Date().getTime(),
        content: e.target.value,
        isCompleted: false,
      };
      setTodo([newTodo, ...todo]);
      window.localStorage.setItem("todos", JSON.stringify([newTodo, ...todo]));
      e.target.value = null;
    } else {
      !createTodo()
    }
  }

  // Add a new todo with button 
  const addTodo = (e) => {
    if (e.target.parentElement.childNodes[0].value.length >= 3) {
      let thatInput = e.target.parentElement.childNodes[0]
      var newTodo = {
        id: new Date().getTime(),
        content: thatInput.value,
        isCompleted: false,
      };
      setTodo([newTodo, ...todo]);
      window.localStorage.setItem("todos", JSON.stringify([newTodo, ...todo]));
      thatInput.value = null;
    } else {
      !addTodo()
    }
  }

  // // Ok delete button working 
  // const okDelete = () => {
  //   deleteTodo(item)
  // }


  // // Delete button working with Confirms 
  // const confirmDelete = () => {
  //   setModal2(!modal2)

  // }



  // Change Dark mode 
  const changeDarkmode = () => {
    setDarkmode(!darkmode)
    // thisMain.style.filter = "invert(1)"
    // darkmodeToggler.style.justifyContent = "flex-end"
  }

  return (
    <>
      {/* Modal Toggler */}
      <main className={darkmode ? 'mainDark' : 'main'} id="thisMain">
        <div className="main-start">
          <h1 className="main__title">Todo App</h1>
          <button className="modal-btn"
          onClick={() => setModal(!modal)}
          >?</button>

          {/* Darkmode Settings  */}
          <button id="darkmodeToggler" className={darkmode ? "toggler-off" : 'darkmode-btn'}>
            <span
            className="darkmode-toggler"
            onClick={() => changeDarkmode()}></span>
          </button>
        </div>

        {/* Changing the languages */}
        {modal && <div className="modal-body">
          <select
            defaultValue={lang}  
            onChange={(e) => {
              setLang(e.target.value)
            }}>
              <option value="uz">uz</option>
              <option value="en">en</option>
              <option value="ru">ru</option>
          </select> 
          <br/>
          <h3>{Content[lang].modall}</h3>
        </div>}

        {/* Input part - Enter Information  */}
        <div className="intro">
          <input
          className="main__input"
          onKeyPress={(e) => createTodo(e)}
          placeholder={"Ma'lumot kiriting!"}
          />
          <button className="main__btn-submit" onClick={addTodo}> Add </button>
        </div>

        {/* Filtering todos  */}
        {/* <select className="filter-btn">
            <option>All</option>
            <option>Completed Tasks</option>
            <option>Uncompleted tasks</option>
        </select> <br/> */}

        {/* Task Counter  */}
        <h3 className="count-title"> Barcha todolar soni {todo.length} taga yetdi.</h3>

        {/* Main List Part  */}
        <ol className="main__list">
          {todo.map((item) => {
            return (

              // Entire List 
              <div className="list-item">
                <li 
                className="main__list-item"
                style={{
                  textDecoration: item.isCompleted ? "line-through" : "none",
                }}
                key={item.id}
              >
                <input

                // Checkbox 
                className="main__checkbox"
                  defaultChecked={item.isCompleted}
                  onChange={(e) => checkTodo(e)}
                  data-id={item.id}
                  type={"checkbox"}
                />

                {/* List's inner text  */}
                {item.content}
              </li>
              {/* Delete Button  */}
              <button className="main__btn-del" onClick={() => {
              deleteTodo(item)}}> x </button>
              </div>
            );
              })}
        </ol>

        {/* Delete modal  */}
        {/* {modal2 && <div className="del__modal">
          <h4 className="del__modal-title">Are you sure to delete this task?</h4>
          <div className="del__modal-btns">
            <button className="del__cancel-btn"> Cancel </button>
            <button className="del__ok-btn" onClick={() => deleteTodo(item)}> Ok </button>
          </div>
        </div>} */}
      </main>
    </>
  );
}

export default App;