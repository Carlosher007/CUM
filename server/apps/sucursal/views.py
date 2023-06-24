from apps.cotizacion.models import AssignedQuote
from apps.cotizacion.api.serializers import ListAssignedQuoteSerializer

def sold_vehicles_sucursal(sucursal:int):
    sold_vehicles_sucursal = AssignedQuote.objects.filter(
        quotation__vehicle_sucursal__sucursal=sucursal, state='FINISHED'
    )

    return ListAssignedQuoteSerializer(sold_vehicles_sucursal, many=True).data

def sold_vehicles_client(client:int):
    sold_vehicles_client = AssignedQuote.objects.filter(
        quotation__client=client, state='FINISHED'
    )

    return ListAssignedQuoteSerializer(sold_vehicles_client, many=True).data
