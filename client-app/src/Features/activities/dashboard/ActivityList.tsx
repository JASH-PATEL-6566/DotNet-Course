import React, { SyntheticEvent, useState } from "react";
import { Activity } from "../../../App/Models/activity";
import { Button, Item, Label, Segment } from "semantic-ui-react";

interface Props {
    activities: Activity[];
    handleSelectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

function ActivityList({
    activities,
    handleSelectActivity,
    deleteActivity,
    submitting,
}: Props) {
    const [target, setTarget] = useState("");

    function handleDeleteActivity(
        e: SyntheticEvent<HTMLButtonElement>,
        id: string
    ) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

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
                                        name={activity.id}
                                        floated="right"
                                        content="delete"
                                        color="red"
                                        loading={
                                            submitting && target === activity.id
                                        }
                                        onClick={(e) =>
                                            handleDeleteActivity(e, activity.id)
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
