import React from "react";
import styled from 'styled-components';
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div.attrs(props => ({
    style: {
        backgroundColor: props.isDragging ? 'lightgreen' : 'white'
    }
}))`
    border: 1px solid lightgrey;
    border-radius: 10px;
    padding: 8px;
    margin-bottom: 8px;
    min-height: 50px;
`;

export default class Task extends React.Component {
    render() {
        return (
            <Draggable draggableId={this.props.task.id} index={this.props.index} direction='horizontal'>
                {(provided, snapshot) => (
                    <Container
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isDragging={snapshot.isDragging} 
                    >
                        <div>{this.props.task.name}</div>
                        <div>{this.props.task.title}</div>
                    </Container>
                )}
            </Draggable>
        );
    }
}
