# Inquery Backend

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Create a `.env` file (already provided):
   - `MONGO_URI=mongodb://localhost:27017/inquerydb`
   - `ADMIN_USERNAME=admin`
   - `ADMIN_PASSWORD=admin123`
   - `JWT_SECRET=supersecretkey`
3. Start the server:
   ```sh
   npm run dev
   ```

## API Endpoints

- `POST /api/inquiry` — Submit inquiry
- `GET /api/inquiry` — List all inquiries (admin, JWT required)
- `DELETE /api/inquiry/:id` — Delete inquiry (admin, JWT required)
- `POST /api/admin/login` — Admin login (returns JWT)

## Admin Credentials

- Username: `admin`
- Password: `admin123`

---

Next: Will scaffold the admin panel frontend in `/admin` route.
