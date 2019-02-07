pragma solidity ^0.5.0;
//pragma solidity >=0.4.22 <0.6.0;

contract Farm1
{
    uint i=0;
    string[20] faadhar;
    string[20] GSTNo;
    string[20] retailer;
    string[20] pincode;
    string[20] day;
    uint insertcount=0;
    uint j=0;
    uint k=21;
    uint avg=0;
    uint count=0;

    string[20] seedname;
    uint[20] seedgrade;
    string[20] fname;
    uint[20] fergrade;
    string[20] item;
    string[20] ECsensor;
    
    function setFarmer(string memory _faadhar, string memory _GSTNo,string memory _retailer, string memory _pincode, string memory _day, string memory _seedname,uint _seedgrade, string memory _fname,uint _fergrade, string memory _item, string memory _ECsensor) public {
        
        faadhar[i]= _faadhar;
        GSTNo[i] = _GSTNo;
        retailer[i] = _retailer;
        pincode[i] = _pincode;
        day[i] = _day;
       // month[i] = _month;
       // year[i] = _year;
        seedname[i]=_seedname;
        seedgrade[i]=_seedgrade;
        fname[i]=_fname;
        fergrade[i]=_fergrade;
        item[i] = _item;
        ECsensor[i] = _ECsensor;
        i++;
        insertcount++;
    }    
        
    
    function stringsEqual(string storage _a, string memory _b) internal returns (bool) {
		bytes storage a = bytes(_a);
		bytes memory b = bytes(_b);
		if (a.length != b.length)
			return false;

		for (i = 0; i < a.length; i ++)
			if (a[i] != b[i])
				return false;
		return true;
	}
    
    function getFarmer(string memory _retailer, string memory _pincode, string memory _item) public returns(string memory,string memory,string memory,uint,uint,string memory,string memory,uint){
      
        k=21;
        avg=0;
        count=0;
        for(j=0; j<insertcount; j++)
        {
            if(stringsEqual(pincode[j],_pincode))
            {
            if(stringsEqual(retailer[j],_retailer))
            {
                if(stringsEqual(item[j],_item))
                {
                       avg=avg+fergrade[j]+seedgrade[j];
                    count=count+2;
                       k=j;
                           
                       
                }
            }
            }
        }
   
        
        if(k!=21){
            avg=avg/count;
            return (pincode[k],retailer[k],item[k],fergrade[k],seedgrade[k],day[k],ECsensor[k],avg);
            //return (avg,count,fergrade[k],seedgrade[k],k,ECsensor[k],avg/count);
            
        }
        else{
            return ("","","",0,0,"","",0);
        }
    
    }

        
         
}