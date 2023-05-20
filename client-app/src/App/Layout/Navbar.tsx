import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface Props {
    openForm: () => void;
}

function Navbar({ openForm }: Props) {
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img
                        src="./assets/logo.png"
                        alt="logo"
                        style={{ marginRight: "10px" }}
                    />
                </Menu.Item>
                <Menu.Item name="Activities" />
                <Menu.Item name="">
                    <Button
                        positive
                        content="Create Activity"
                        onClick={openForm}
                    />
                </Menu.Item>
            </Container>
        </Menu>
    );
}

export default Navbar;
