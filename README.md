# parking
Parking Management System

Make sure Node.js and git install in your machine before try to launch this API.

Step to launch this API => 
    
    1. git clone https://github.com/gyankit/parking.git 
    2. cd ./parking
    3. npm install
    4. go to ./bin/www -> change port if you what to run API on specific port default port 8000
    5. got to ./config/database.js -> give MongoDB database URL 
    4. npm start -> to run using node
        or npm run dev => to run using nodemon


Api Routes =>

    Get Request -> 
        /api/occupied-slots -> return Array of occupied parking Numbers
        /api/available-slots -> return Array of available parking Numbers
        /api/registered-users -> return Array of JSON Object for All occupied parking

    Delete Request ->
        /api/booking-delete -> to remove/cancel booking
            request body = { 
                booking_id: string (required), 
                parking_number: number (required) 
            }


    Put Request -> 
        /api/booking-update -> to confirm booking before 30/15 minutes
            request body = { 
                booking_id: string (required), 
                parking_number: number (required) 
            }

    Post Request ->
        /api/booking -> to book parking
        request body = {
            user_name: string (required)
            vehicle_number: string (required),
            differently_abled: true | false (required),
            pregnent_women: true | false (required),
            parking_number: null | number (required) [number < totalParking]
        }