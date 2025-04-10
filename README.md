# GigLink
## URL
https://gig-link-navy.vercel.app/

👤 Test account  
Email: `testuser@example.com`  
Password: `test1234`

## Overview
GigLink is a platform where musicians can post and join small live music events. It provides an easy way to create events, manage participants, and view profiles—all in one place. This portfolio demonstrates my front-end development skills using modern web technologies.

## Technologies Used
- Next.js
- TypeScript
- Tailwind CSS
- Clerk
- Prisma
- Supabase

  
## Features

| Home Screen | Login Screen
| --- | --- |
| ![Home Screen](https://github.com/user-attachments/assets/5cf088c4-8299-498e-b753-72774a27bf2e) | ![Login Screen](https://github.com/user-attachments/assets/8bba463c-e4b7-4318-ae5c-b03c853d618e) |
| The home screen allows users to navigate to event creation, participation, and profile pages. | Authentication is handled by Clerk, allowing users to log in with their Google accounts. |

| Host1 - Event Management | Host2 - Event Creation Form |
| --- | --- |
| ![Host1](https://github.com/user-attachments/assets/776ecf0a-e462-4cd0-af46-ac5477ee8ae1) | ![Host2](https://github.com/user-attachments/assets/6c1525c7-60a8-4527-a0b4-9dfbfe79332d) |
| On the Host page, users can view upcoming events they are hosting, manage applicants, and edit event details. | After selecting "Create New Event," users can input event details like date, time, and location. Google API auto-suggests location options as users type. |

| Join１ - Event Discovery | Join2 - Join Form |
| --- | --- |
| ![Join１](https://github.com/user-attachments/assets/20c2c93d-2282-4132-a2a4-61c2b47292b8) | ![Join2](https://github.com/user-attachments/assets/33f8b0c3-ecf1-42e2-855c-290010588145) |
| The Join page shows upcoming events: blue for joinable, red for applied, and green for hosted. You can filter by different criteria.  | View detailed event information and customize your application by selecting your instrument and updating your bio before applying.|

| Join3 - Application Status  | Join4 - Map View |
| --- | --- |
| ![Join3](https://github.com/user-attachments/assets/844047d6-273a-4abd-984f-b8b41cc2bc30) | ![Join4](https://github.com/user-attachments/assets/50858d19-57f5-4412-b179-04660fcf6196) |
|　After applying, the event status updates with the option to cancel your application if needed. | The Join page also includes a map to help you find events based on location. Keep in mind that only events with valid latitude/longitude data from Google API will show up. |

| Profile1 - Personal Info | Profile2 - Application Tracking |
| --- | --- |
| ![Profile1](https://github.com/user-attachments/assets/500c04d0-6a27-4fe9-b665-ce703eddd609) | ![Profile2](https://github.com/user-attachments/assets/47bfd9b9-5d62-4b8a-8b2f-73002de0b9f1) |
| From the Profile page, you can update your bio and manage your instrument settings. | The "Application Status" section shows the status of events you've applied to. This is updated by the event host.
<br />


## ER Diagram
![ER Diagram](https://github.com/user-attachments/assets/c0253b47-a54b-46e0-a39a-fce05c1a7cef)

## Future Improvements

- Implement a direct messaging or comment feature to facilitate communication between event organizers and participants.

- Notify users when an event they have joined is updated or canceled to keep them informed.

- Refine the location input fields by adding sections for postal codes, street addresses, and other details to enhance accuracy.

- Allow organizers to upload images to showcase the venue and atmosphere, helping participants get a better sense of the event.