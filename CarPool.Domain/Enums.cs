using System;
using System.Collections.Generic;
using System.Text;

namespace CarPool.Domain.Enum
{
    public enum PaymentStatus
    {
        Pending,
        Success,
        Failed
    }

    public enum RideRequestStatus
    {
        Accepted,
        Pending,
        Rejected
    }

    public enum TravellerRole
    {
        Rider,
        Passenger
    }

    public enum BookingStatus
    {
        Booked = 1,
        Pending,
        Cancelled
    }

    public enum RatingType
    {
        Worst = 1,
        Bad,
        Meh,
        Good,
        Excellent
    }

    public enum RideType
    {
        Offered,
        Booked
    }

    public enum RideStatusType
    {
        UpComing,
        OnGoing,
        Completed,
        Cancelled
    }

    public enum VehicleType
    {
        Mini,
        Sedan,
        SUV,
        HatchBack,
        Coupe,
        RoadSter
    }

    public enum ViaPointsType
    {
        Madhapur,
        HitecCity,
        Kondapur,
        Kukatpally,
        BoraBanda,
        Gachibowli,
        JublieHills,
        YousufGuda,
        MadhuraNagar,
        SRNagar,
        Ameerpet,
        Secundrabad,
        Nampally,
        Miapur,
        LBNagar,
        MetuGuda,
        Medhipatnum,
        Kotti,
        NecklesRoad,
        Punjagutta,
        MGBusStop,
        SecundrabadRailway,
        KachiGuda
    }
}
