from flask import Flask, request, jsonify
from prophet import Prophet
import pandas as pd

app = Flask(__name__)

@app.route('/forecast', methods=['POST'])
def forecast():
    try:
        # Get JSON data from the request
        request_data = request.json
        
        # Extract daily sales data from the request
        daily_sales_data = request_data['salesData']

        # Convert the data to a DataFrame
        df = pd.DataFrame(daily_sales_data)

        # Initialize Prophet model
        model = Prophet()

        # Fit the model to your data
        model.fit(df)

        # Make a dataframe for the next 7 days
        future = model.make_future_dataframe(periods=7, freq='D')

        # Generate forecasts
        forecast = model.predict(future)

        # Extract forecasts for the next 7 days
        forecast_next_7_days = forecast[['ds', 'yhat']].tail(7)

        # Add a new field 'formatted_date' with formatted date (dd-mmm)
        forecast_next_7_days['date'] = forecast_next_7_days['ds'].dt.strftime('%d-%b')
        forecast_next_7_days = forecast_next_7_days.rename(columns={'yhat': 'profit'})
        forecast_next_7_days['profit'] = forecast_next_7_days['profit'].round(2)

        # Return forecasted data as JSON response
        return jsonify(forecast_next_7_days[['ds', 'date', 'profit']].to_dict(orient='records')), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001) # Run Flask server on a different port, e.g., 5001
