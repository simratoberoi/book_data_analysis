# Book Analysis Dashboard

A full-stack web application for analyzing bestselling books data with interactive charts and visualizations.

## Features

- 📊 **Interactive Charts**: Visualize book data with bar charts, line charts, and pie charts
- 👥 **Top Authors**: See the most prolific authors in the bestseller list
- 🎭 **Genre Analytics**: Analyze average ratings by genre
- 📈 **Yearly Trends**: Track rating trends over time
- 💰 **Price Stats**: View maximum book prices and total book count
- 🎨 **Beautiful UI**: Google Material Design-inspired interface

## Tech Stack

### Backend

- **Python 3.x** with Flask
- **Pandas** for data analysis
- **Flask-CORS** for cross-origin requests
- **Gunicorn** for production server

### Frontend

- **React 19** with Vite
- **Recharts** for data visualization
- **JavaScript (ES6+)**

## Project Structure

```
.
├── backend/
│   ├── app.py                 # Flask API
│   ├── requirements.txt       # Python dependencies
│   ├── Procfile              # Render deployment config
│   ├── bestsellers.csv       # Dataset
│   ├── Authors.csv
│   ├── avg_genre_rating.csv
│   ├── top_authors.csv
│   ├── yearwise_rating.csv
│   └── main.ipynb            # Analysis notebook
├── frontend/
│   ├── src/
│   │   ├── frontend.jsx      # Main dashboard component
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── .env.local            # Local env variables
│   └── .env.example          # Environment template
├── DEPLOYMENT.md             # Deployment guide
└── README.md                 # This file
```

## Installation

### Prerequisites

- Node.js 16+ and npm
- Python 3.8+
- Git

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Run the Flask server:

```bash
python app.py
```

Server will start at `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

Frontend will open at `http://localhost:5173` (or the port shown in terminal)

## API Endpoints

All endpoints return JSON data:

| Endpoint              | Method | Description                                 |
| --------------------- | ------ | ------------------------------------------- |
| `/api/top-authors`    | GET    | Top 10 authors by number of bestsellers     |
| `/api/genre-ratings`  | GET    | Average rating by genre                     |
| `/api/yearly-ratings` | GET    | Average rating by publication year          |
| `/api/stats`          | GET    | General statistics (max price, total books) |
| `/api/all-data`       | GET    | All processed data in one call              |

### Example Response

```json
{
  "max_price": 19.99,
  "total_books": 550
}
```

## Usage

1. Start both backend and frontend servers (see Installation)
2. Open `http://localhost:5173` in your browser
3. View interactive charts and analytics
4. Data is automatically fetched from the backend API

## Environment Variables

### Frontend (.env.local)

```env
VITE_API_URL=http://localhost:5000  # Backend URL
```

### Production

See `.env.example` for production configuration template.

## Available Scripts

### Backend

```bash
python app.py           # Run development server
gunicorn app:app       # Run production server (Render)
```

### Frontend

```bash
npm run dev            # Start dev server
npm run build          # Build for production
npm run preview        # Preview production build
npm run lint           # Lint code
```

## Deployment

This project is configured for easy deployment on:

- **Backend**: Render.com
- **Frontend**: Vercel.com

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment instructions.

### Quick Deploy

1. Push code to GitHub
2. Connect Render for backend deployment
3. Connect Vercel for frontend deployment
4. Add `VITE_API_URL` environment variable on Vercel pointing to your Render backend

## Development

### Adding New Charts

1. Edit `frontend/src/frontend.jsx`
2. Add new endpoint in `backend/app.py`
3. Fetch data and render with Recharts components

### Modifying Data Analysis

1. Update `backend/app.py` to modify data processing
2. Changes reflect immediately on the frontend

### Styling

- Global styles in `frontend/src/index.css`
- Component styles in `frontend/src/App.css`
- Inline styles in `frontend/src/frontend.jsx`

## Data

The project uses CSV files containing bestselling books data:

- `bestsellers.csv` - Main dataset
- Supporting CSV files with pre-computed analytics

### CSV Structure

```
Name, Author, User Rating, Reviews, Price, Year, Genre
```

## Performance Optimization

- Pandas efficiently loads and processes CSV data
- Recharts optimized for rendering large datasets
- Vite provides fast development builds
- Gunicorn handles concurrent requests efficiently

## Troubleshooting

### Frontend can't connect to backend

- Ensure backend is running on port 5000
- Check if `VITE_API_URL` is correctly set
- Check browser console for CORS errors

### Data not loading

- Verify CSV files exist in `backend/` directory
- Check backend logs for errors
- Ensure Pandas can parse CSV files

### Port already in use

```bash
# Kill process on port 5000 (backend)
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -i :5173 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Author

Sam

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Happy analyzing!** 📚📊
