import React from "react";
import Task from './Task';
import styled from 'styled-components';
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
    margin: 8px;
    border: 2px solid lightgrey;
    border-radius: 20px;
    display: flex;
    width: 400px;
    min-height: 800px;
    flex-direction: column;

`;
const Title = styled.h3`
    padding: 8px;
    color: white;
`;
const TaskList = styled.div`
    padding: 8px;
    min-height: 100px;
    transition: background-color 0.15s ease;
    background-color: ${props => (props.isDraggingOver ? 'thistle' : 'transparent')};
    flex-grow: 1;
`;

export default class Column extends React.Component{
    render(){
        return (
            <Container>
                <Title>{this.props.column.title}</Title>
                <Droppable droppableId={this.props.column.id} isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={true} direction="vertical">
                    {(provided, snapshot) =>(
                        <TaskList  
                            ref={provided.innerRef} 
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                            >
                            {this.props.tasks.map((task, index) => (
                                <Task key={task.id} task={task} index={index}/>
                            ))}
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </Container>
        );
    }
}