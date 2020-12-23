from django.shortcuts import render
import json
import requests

from django.views.generic import TemplateView

# Create your views here.
class FinancialDataView(TemplateView):
    template_name = 'financialdata.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # news_data = requests.get(
        #     'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=ece95912ea3746e68826c8eb30e2eb66')
        # context['financialdata'] = json.dumps(news_data.json(),
        #                                  sort_keys=True,
        #                                  indent=4)
        url = "https://yahoo-finance-low-latency.p.rapidapi.com/v8/finance/chart/AAPL"

        querystring = {"comparisons":"MSFT,^VIX","events":"div,split"}

        headers = {
            'x-rapidapi-key': "098911c84amsh858307b7eaebf6cp1e62dfjsnd559913a493e",
            'x-rapidapi-host': "yahoo-finance-low-latency.p.rapidapi.com"
            }

        response = requests.request("GET", url, headers=headers, params=querystring)
        context['financialdata'] = json.dumps(response.json(),
                                         sort_keys=True,
                                         indent=4)
        #context['financialdata'] = response.json()
        return context

