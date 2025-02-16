import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import Column from "./components/Column";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const BackgroundContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url("/Background_dashboard.jpg");
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 1080px) {
    background-image: none;
    background-color: gray;
    overflow: auto;
    displat: inline-block;
  }
`;

const GroupsContainer = styled.div`
  padding: 6% 2% 2% 2%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadingText = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 20px;
`;

class App extends React.Component {
  state = {
    tasks: {},
    columns: {},
    columnOrder: [],
    loading: true,
  };

  async componentDidMount() {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/get-state");
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();
      this.setState({
        tasks: data.tasks,
        columns: data.columns,
        columnOrder: data.columnOrder,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false });
    }
  }

  onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    this.setState((prevState) => {
      const start = prevState.columns[source.droppableId];
      const finish = prevState.columns[destination.droppableId];

      if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...start,
          taskIds: newTaskIds,
        };

        return {
          ...prevState,
          columns: {
            ...prevState.columns,
            [newColumn.id]: newColumn,
          },
        };
      }

      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };

      return {
        ...prevState,
        columns: {
          ...prevState.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      });

      if (!response.ok) {
        console.error("Error saving state:", response.statusText);
      } else {
        console.log("State saved successfully!");
      }
    } catch (error) {
      console.error("Error sending request.", error);
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <BackgroundContainer>
          <LoadingText>Loading Data...</LoadingText>
        </BackgroundContainer>
      );
    }

    return (
      <BackgroundContainer>
        <GroupsContainer>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Container>
              {this.state.columnOrder.map((columnId) => {
                const column = this.state.columns[columnId];
                const tasks = column.taskIds.map(
                  (taskId) => this.state.tasks[taskId]
                );
                return <Column key={column.id} column={column} tasks={tasks} />;
              })}
            </Container>
          </DragDropContext>
        </GroupsContainer>
      </BackgroundContainer>
    );
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<App />} />
    </Routes>
  </Router>
);
