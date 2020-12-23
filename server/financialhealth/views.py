from django.shortcuts import render
from django.http import HttpResponse
import yfinance as yf

# Create your views here.


def index(request):
    aapl = yf.Ticker("aapl")
    return render(aapl)