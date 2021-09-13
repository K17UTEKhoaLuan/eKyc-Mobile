import React, { useState, useRef, useEffect } from "react";
import {
    AlertDialog,
    Button,
    Center,
} from "native-base";

const AlertDialogComponent = ({ open, message, handleCloseAlert }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => {
        setIsOpen(false);
        handleCloseAlert();
    }
    const cancelRef = React.useRef();

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    return (
        <Center>
            <AlertDialog
                leastDestructiveRef={cancelRef}
                isOpen={isOpen}
                onClose={onClose}
                motionPreset={"fade"}
            >
                <AlertDialog.Content>
                    <AlertDialog.Header fontSize="lg" fontWeight="bold">
                        Message
                    </AlertDialog.Header>
                    <AlertDialog.Body>
                        {message}
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button ref={cancelRef} onPress={onClose}>
                            OK
                        </Button>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </Center>
    );
}

export default AlertDialogComponent;