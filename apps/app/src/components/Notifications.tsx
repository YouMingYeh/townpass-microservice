import { useEffect } from "react";
import { useToast } from "ui";

export const Notifications = () => {
    const { toast } = useToast();

    useEffect(() => {
        const socket = new WebSocket("wss://your-websocket-url");

        socket.addEventListener("open", () => {
            // WebSocket connection is established
            // toast("WebSocket connection established");
        });

        socket.addEventListener("message", (event) => {
            // Handle incoming WebSocket messages
            const message = event.data;
            // toast(`Received message: ${message}`);
        });

        socket.addEventListener("close", () => {
            // WebSocket connection is closed
            // toast("WebSocket connection closed");
        });

        // Clean up the WebSocket connection when the component unmounts
        return () => {
            socket.close();
        };
    }, []);

    return (
        <div>
            <h1>Notifications</h1>
        </div>
    );
};
