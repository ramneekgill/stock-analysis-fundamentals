from django.shortcuts import render
from django.http import HttpResponse, HttpResponseServerError
import json
import requests
from rest_framework.viewsets import ModelViewSet
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

# Create your views here.
class FinancialDataView(TemplateView):
    template_name = 'financialdata.html'

    def get_context_data(self, **kwargs):
        if self.request.method == "OPTIONS":
            print("Post clicked, here is data")
            print(self.request.data)
        context = super().get_context_data(**kwargs)
        # url = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary"
        # print("this is the method:")
        # print(self.request.method)
        # querystring = {"symbol":"ALLD","region":"US"}

        # headers = {
        #     'x-rapidapi-key': "098911c84amsh858307b7eaebf6cp1e62dfjsnd559913a493e",
        #     'x-rapidapi-host': "apidojo-yahoo-finance-v1.p.rapidapi.com"
        #     }

        # response = requests.request("GET", url, headers=headers, params=querystring).json()

        # context['marketCap'] = response['price']['shortName']

        return context

    def post(self, request, *args, **kwargs):
        # serializer = self.get_serializer(data=request.data)
        # headers = self.get_success_headers(request.data)
        # return Response(request.data, status=status.HTTP_201_CREATED, headers=headers)
        json_data = json.loads(request.body)
        url = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary"

        querystring = {"symbol":json_data['Symbol'],"region":"US"}

        headers = {
            'x-rapidapi-key': "098911c84amsh858307b7eaebf6cp1e62dfjsnd559913a493e",
            'x-rapidapi-host': "apidojo-yahoo-finance-v1.p.rapidapi.com"
            }

        response = requests.request("GET", url, headers=headers, params=querystring)
        
        try:
            response = JsonResponse(response.json())
        except:
            if response.status_code == 200:
                return HttpResponse("empty")


        return response



    # @csrf_exempt
    # def post(self, request, *args, **kwargs):
    #         print("it worked")
    #         return "good"



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


