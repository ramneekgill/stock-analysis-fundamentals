from django.urls import path
from financialdata.views import FinancialDataView

urlpatterns = [
    path('', FinancialDataView.as_view()),
]