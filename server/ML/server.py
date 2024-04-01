from flask import Flask, request, jsonify
from prophet import Prophet
import pandas as pd

app = Flask(__name__)

@app.route('/forecast', methods=['POST'])
def forecast():
    try:
        request_data = request.json
        
        daily_sales_data = request_data['salesData']

        df = pd.DataFrame(daily_sales_data)

        model = Prophet()

        model.fit(df)

        future = model.make_future_dataframe(periods=7, freq='D')

        forecast = model.predict(future)

        forecast_next_7_days = forecast[['ds', 'yhat']].tail(7)

        forecast_next_7_days['date'] = forecast_next_7_days['ds'].dt.strftime('%d-%b')
        forecast_next_7_days = forecast_next_7_days.rename(columns={'yhat': 'profit'})
        forecast_next_7_days['profit'] = forecast_next_7_days['profit'].round(2)

        return jsonify(forecast_next_7_days[['ds', 'date', 'profit']].to_dict(orient='records')), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001)
