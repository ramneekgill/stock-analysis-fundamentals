from django.shortcuts import render
from django.http import HttpResponse, HttpResponseServerError
import json
import requests
from rest_framework.viewsets import ModelViewSet
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import math

# Create your views here.
class FinancialDataView(TemplateView):
    def post(self, request, *args, **kwargs):
        json_data = json.loads(request.body)
        company_valuation = {}

        #YAHOO FINANCE API
        url = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary"
        try:
            querystring = {"symbol":json_data['Symbol'],"region":"US"}
        except:
            return HttpResponse("Symbol not recognized")
        headers = {
            'x-rapidapi-key': "098911c84amsh858307b7eaebf6cp1e62dfjsnd559913a493e",
            'x-rapidapi-host': "apidojo-yahoo-finance-v1.p.rapidapi.com"
            }
        yf_response = requests.request("GET", url, headers=headers, params=querystring)
        try:
            yf_response = yf_response.json()
        except:
            if yf_response.status_code == 200:
                return HttpResponse("empty")

        #MORNINGSTAR API
        url = "https://morningstar1.p.rapidapi.com/live-stocks/GetValuation"

        querystring_nasdaq = {"Mic":"XNAS","Ticker":json_data['Symbol']}
        querystring_nyse = {"Mic":"XNYS","Ticker":json_data['Symbol']}
        headers = {
            'x-rapidapi-key': "f65756bab8msh693c521e8c81b73p115d9fjsn2e9723cd1ba1",
            'x-rapidapi-host': "morningstar1.p.rapidapi.com"
            }
        ms_response = requests.request("GET", url, headers=headers, params=querystring_nyse)
        if ms_response.status_code == 404:
            ms_response = requests.request("GET", url, headers=headers, params=querystring_nasdaq)
            print(ms_response)
            if ms_response.status_code == 404:
                return HttpResponse("empty")
        try:
            ms_response = ms_response.json()
        except:
            if ms_response.status_code == 200:
                return HttpResponse("empty")

        company_valuation['Summary'] = yf_response['summaryProfile']['longBusinessSummary']
        company_valuation['company_name'] = yf_response['price']['shortName']
        company_valuation['MarketCap_Raw'] = yf_response['price']['marketCap']['raw']
        company_valuation['MarketCap_Fmt'] = yf_response['price']['marketCap']['fmt']
        company_valuation['P/E_Company'] = round(float(ms_response['Collapsed']['rows'][1]['datum'][10]), 2) 
        company_valuation['P/E_Sector'] = round(float(ms_response['Collapsed']['rows'][1]['datum'][12]), 2)
        company_valuation['P/CF_Company'] = round(float(ms_response['Collapsed']['rows'][2]['datum'][10]), 2) 
        company_valuation['P/CF_Sector'] = round(float(ms_response['Collapsed']['rows'][2]['datum'][12]), 2)
        company_valuation['P/B_Company'] = round(float(ms_response['Collapsed']['rows'][3]['datum'][10]), 2) 
        company_valuation['P/B_Sector'] = round(float(ms_response['Collapsed']['rows'][3]['datum'][12]), 2)
        company_valuation['PEG'] = round(float(ms_response['Expanded']['rows'][1]['datum'][10]), 2)
        company_valuation['quick_ratio_fmt'] = yf_response['financialData']['quickRatio']['fmt']
        company_valuation['quick_ratio_raw'] = yf_response['financialData']['quickRatio']['raw']
        company_valuation['current_ratio_fmt'] = yf_response['financialData']['currentRatio']['fmt']
        company_valuation['current_ratio_raw'] = yf_response['financialData']['currentRatio']['raw']
        company_valuation['ROE_fmt'] = yf_response['financialData']['returnOnEquity']['fmt']
        company_valuation['ROE_raw'] = yf_response['financialData']['returnOnEquity']['raw']

        if(company_valuation['MarketCap_Raw'] < 250000000): company_valuation['marketCapRisk'] = "Very High"
        elif(company_valuation['MarketCap_Raw'] >= 250000000 and company_valuation['MarketCap_Raw'] <= 2000000000): company_valuation['marketCapRisk'] = "High"
        elif(company_valuation['MarketCap_Raw'] > 2000000000 and company_valuation['MarketCap_Raw'] <= 10000000000): company_valuation['marketCapRisk'] = "Medium"
        elif(company_valuation['MarketCap_Raw'] > 10000000000): company_valuation['marketCapRisk'] = "Low"

        if(company_valuation['P/E_Company'] > company_valuation['P/E_Sector']*2): company_valuation['P/E_Risk'] = 'High'
        elif(company_valuation['P/E_Company'] <= company_valuation['P/E_Sector']*2 and company_valuation['P/E_Company'] >= company_valuation['P/E_Sector']/2): company_valuation['P/E_Risk'] = 'Medium'
        elif(company_valuation['P/E_Company'] < company_valuation['P/E_Sector']/2): company_valuation['P/E_Risk'] = 'Low'
        
        if(company_valuation['P/CF_Company'] > company_valuation['P/CF_Sector']*2): company_valuation['P/CF_Risk'] = 'High'
        elif(company_valuation['P/CF_Company'] <= company_valuation['P/CF_Sector']*2 and company_valuation['P/CF_Company'] >= company_valuation['P/CF_Sector']/2): company_valuation['P/CF_Risk'] = 'Medium'
        elif(company_valuation['P/CF_Company'] < company_valuation['P/CF_Sector']/2): company_valuation['P/CF_Risk'] = 'Low'

        if(company_valuation['P/B_Company'] > company_valuation['P/B_Sector']*2): company_valuation['P/B_Risk'] = 'High'
        elif(company_valuation['P/B_Company'] <= company_valuation['P/B_Sector']*2 and company_valuation['P/B_Company'] >= company_valuation['P/B_Sector']/2): company_valuation['P/B_Risk'] = 'Medium'
        elif(company_valuation['P/B_Company'] < company_valuation['P/B_Sector']/2): company_valuation['P/B_Risk'] = 'Low'
    
        if(company_valuation['PEG'] > 2): company_valuation['PEG_Risk'] = 'High'
        elif(company_valuation['PEG'] > 1 and company_valuation['PEG'] < 2): company_valuation['PEG_Risk'] = 'Medium'
        elif(company_valuation['PEG'] <= 1): company_valuation['PEG_Risk'] = 'Low'

        if(company_valuation['quick_ratio_raw'] < 0.5): company_valuation['quick_ratio_Risk'] = 'High'
        elif(company_valuation['quick_ratio_raw'] < 1): company_valuation['quick_ratio_Risk'] = 'Medium'
        elif(company_valuation['quick_ratio_raw'] >= 1): company_valuation['quick_ratio_Risk'] = 'Low'

        if(company_valuation['current_ratio_raw'] < 0.5): company_valuation['current_ratio_Risk'] = 'High'
        elif(company_valuation['current_ratio_raw'] < 1.2): company_valuation['current_ratio_Risk'] = 'Medium'
        elif(company_valuation['current_ratio_raw'] >= 1.2): company_valuation['current_ratio_Risk'] = 'Low'

        if(company_valuation['ROE_raw'] < 0): company_valuation['ROE_Risk'] = 'High'
        elif(company_valuation['ROE_raw'] < 0.1): company_valuation['ROE_Risk'] = 'Medium'
        elif(company_valuation['ROE_raw'] >= 0.1): company_valuation['ROE_Risk'] = 'Low'

        return JsonResponse(company_valuation)


