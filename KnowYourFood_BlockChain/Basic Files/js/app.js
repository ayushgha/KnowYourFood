App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
    // $.getJSON('../pets.json', function(data) {
    //   var petsRow = $('#petsRow');
    //   var petTemplate = $('#petTemplate');

    //   for (i = 0; i < data.length; i ++) {
    //     petTemplate.find('.panel-title').text(data[i].name);
    //     petTemplate.find('img').attr('src', data[i].picture);
    //     petTemplate.find('.pet-breed').text(data[i].breed);
    //     petTemplate.find('.pet-age').text(data[i].age);
    //     petTemplate.find('.pet-location').text(data[i].location);
    //     petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

    //     petsRow.append(petTemplate.html());
    //   }
    // });

    return await App.initWeb3();
  },

  initWeb3: function() {
   if(typeof web3 !== undefined){
     App.web3Provider = web3.currentProvider;
   } else {
     App.web3Provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
   }
   web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Farm1.json", function(data){
      console.log(data);
      var adoptionArtifact = data;

      App.contracts.adoption = TruffleContract(adoptionArtifact);

      App.contracts.adoption.setProvider(App.web3Provider);

      // return  App.markAdopted();
    })
    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-submit', App.storeData);
    $(document).on('click', '.btn-cust', App.retrData);
  },

  markAdopted: function(adopters, account) {
    App.contracts.adoption.deployed().then(function(instance){
      return instance.getAdopters.call();
    }).then(function(adopters){
      for(let i = 0;i< adopters.length;i++) {
        if(!web3.toBigNumber(adopters[i]).isZero()){
          $('.panel-pet').eq(i).find("button").text("Success").attr("disabled",true);
        }
      }
    }).catch(function(error){
      console.log(error.message);
    });
  },
  storeData: function(event){
    event.preventDefault();

   // var petId = parseInt($(event.target).data('id'));
   var fname=$("#FName").val();
   var gstno=$("#R_GST").val();
   var retailer=$("#RName").val();
   var pincode=$("#pincode").val();
  //  var day=$("#date").val();
  //  var month=$("#month").val();
  //  var year=$("#year").val();
   var sname=$("#SeedName").val();
   var sgrade=parseInt($("#sgrade").val());
   var fname=$("#FerName").val();
   var fgrade=parseInt($("#fgrade").val());
   var item=$("#item").val();
   var sensor=$("#sensor").val();

   //console.log(typeof(sgrade));
   var date='06/Jan/2019';

    web3.eth.getAccounts(function(error,accounts){
      if(error){
        console.log(error.message);
      }

      App.contracts.adoption.deployed().then(function(instance){
        console.log('hi');
        return instance.setFarmer.sendTransaction(fname,gstno,retailer,pincode,date,sname,sgrade,fname,fgrade,item,sensor,{from: accounts[0]})
      }).then(function(result){
        console.log('sent successfully farmer data');
       // return App.markAdopted();
      }).catch(function(error){
        console.log(error.message);
      });
    })
  },

  retrData: function(event){
    event.preventDefault();

 
   var retailerc=$("#RNamec").val();
   var pincodec=$("#pincodec").val();
   var itemc=$("#itemc").val();
    console.log(itemc);
    web3.eth.getAccounts(function(error,accounts){
      if(error){
        console.log(error.message);
      }

        App.contracts.adoption.deployed().then(function(instance){
          console.log('hi');
          return instance.getFarmer.call(retailerc,pincodec,itemc)
          }).then(function(result){
            console.log(parseInt(result[7]));
            console.log(result);
          }).catch(function(error){
            console.log(error.message);
          });
        //   .call({from: accounts[0]}).then(function(rdata){
        //   console.log('retrieved successfully farmer data');
        //   for(let i = 0;i< rdata.length;i++) {
        //     console.log(rdata[i]);
        //   }
        // }).catch(function(error){
        //   console.log(error.message);
        // });
      })
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    web3.eth.getAccounts(function(error,accounts){
      if(error){
        console.log(error.message);
      }

      App.contracts.adoption.deployed().then(function(instance){
        return instance.adopt.sendTransaction(petId,{from: accounts[0]})
      }).then(function(result){
        return App.markAdopted();
      }).catch(function(error){
        console.log(error.message);
      });
    })
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
