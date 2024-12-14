import Echo from 'laravel-echo';

// Cấu hình Laravel Echo
const echo = new Echo({
    broadcaster: 'pusher',
    key: '1c8d0aa5e483a031da28', // PUSHER_APP_KEY
    cluster: 'ap1',             // PUSHER_APP_CLUSTER
    forceTLS: false,            // Nếu không dùng HTTPS
    wsHost: '127.0.0.1',        // PUSHER_HOST
    wsPort: 6001,               // PUSHER_PORT
    disableStats: true,         // Giảm tải
});

export default echo;