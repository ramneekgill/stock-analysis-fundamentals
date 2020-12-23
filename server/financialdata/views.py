from django.shortcuts import render
import json
import requests

from django.views.generic import TemplateView

# Create your views here.
class FinancialDataView(TemplateView):
    template_name = 'financialdata.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        url = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary"

        querystring = {"symbol":"AMRN","region":"US"}

        headers = {
            'x-rapidapi-key': "098911c84amsh858307b7eaebf6cp1e62dfjsnd559913a493e",
            'x-rapidapi-host': "apidojo-yahoo-finance-v1.p.rapidapi.com"
            }

        response = requests.request("GET", url, headers=headers, params=querystring).json()

        context['marketCap'] = response['price']['marketCap']['raw']

        return context

# def test_func():
#     url = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary"

#     querystring = {"symbol":"AMRN","region":"US"}

#     headers = {
#         'x-rapidapi-key': "098911c84amsh858307b7eaebf6cp1e62dfjsnd559913a493e",
#         'x-rapidapi-host': "apidojo-yahoo-finance-v1.p.rapidapi.com"
#         }

#     response = requests.request("GET", url, headers=headers, params=querystring).json()
#     #obj = response.json()
#     print(response['price']['marketCap']['raw'])

# test_func()


