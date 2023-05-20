import React from "react";
import { Activity } from "../../../App/Models/activity";
import { Button, Item, Label, Segment } from "semantic-ui-react";

interface Props {
    activities: Activity[];
    handleSelectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}

function ActivityList({
    activities,
    handleSelectActivity,
    deleteActivity,
}: Props) {
    return (
        <>
            <Segment>
                <Item.Group divided>
                    {activities.map((activity) => (
                        <Item key={activity.id}>
                            <Item.Content>
                                <Item.Header as="a">
                                    {activity.title}
                                </Item.Header>
                                <Item.Meta>{activity.date}</Item.Meta>
                                <Item.Description>
                                    <div>{activity.description}</div>
                                    <div>
                                        {activity.city} , {activity.venue}
                                    </div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button
                                        floated="right"
                                        content="view"
                                        color="blue"
                                        onClick={() =>
                                            handleSelectActivity(activity.id)
                                        }
                                    />
                                    <Button
                                        floated="right"
                                        content="delete"
                                        color="red"
                                        onClick={() =>
                                            deleteActivity(activity.id)
                                        }
                                    />
                                    <Label basic content={activity.category} />
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    ))}
                </Item.Group>
            </Segment>
        </>
    );
}

export default ActivityList;
