from rest_framework import serializers
from ..models import Quotation, AssignedQuote

class QuotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quotation
        fields = '__all__'
        read_only_fields = ['id']

class AssignedQuoteSerializer(serializers.ModelSerializer):
    quotation = QuotationSerializer()

    class Meta:
        model = AssignedQuote
        fields = '__all__'