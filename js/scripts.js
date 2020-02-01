var select2Data = [
  {
    "text": "Alaskan/Hawaiian Time Zone",
    "children": [
      {
        id: "AK",
        text: "Alaska"
      },
      {
        id: "HI",
        text: "Hawaii"
      }
    ],
  },
  {
    "text": "Pacific Time Zone",
    "children": [
      {
        id: "CA",
        text: "California"
      },
      {
        id: "NV",
        text: "Nevada"
      },
      {
        id: "OR",
        text: "Oregon"
      },
      {
        id: "WA",
        text: "Washington"
      }
    ],
  },
  {
    "text": "Mountain Time Zone",
    "children": [
      {
        id: "AZ",
        text: "Arizona"
      },
      {
        id: "CO",
        text: "Colorado"
      },
      {
        id: "ID",
        text: "Idaho"
      },
      {
        id: "MT",
        text: "Montana"
      },
      {
        id: "NE",
        text: "Nebraska"
      },
      {
        id: "NM",
        text: "New Mexico"
      },
      {
        id: "ND",
        text: "North Dakota"
      },
      {
        id: "UT",
        text: "Utah"
      },
      {
        id: "WY",
        text: "Wyoming"
      }
    ],
  },
  {
    "text": "Central Time Zone",
    "children": [
      {
        id: "AL",
        text: "Alabama"
      },
      {
        id: "AR",
        text: "Arkansas"
      },
      {
        id: "IL",
        text: "Illinois"
      },
      {
        id: "IA",
        text: "Iowa"
      },
      {
        id: "KS",
        text: "Kansas"
      },
      {
        id: "KY",
        text: "Kentucky"
      },
      {
        id: "LA",
        text: "Louisiana"
      },
      {
        id: "MN",
        text: "Minnesota"
      },
      {
        id: "MS",
        text: "Mississippi"
      },
      {
        id: "MO",
        text: "Missouri"
      },
      {
        id: "OK",
        text: "Oklahoma"
      },
      {
        id: "SD",
        text: "South Dakota"
      },
      {
        id: "TX",
        text: "Texas"
      },
      {
        id: "TN",
        text: "Tennessee"
      },
      {
        id: "WI",
        text: "Wisconsin"
      },
    ],
  },
  {
    "text": "Eastern Time Zone",
    "children": [
      {
        id: "CT",
        text: "Connecticut"
      },
      {
        id: "DE",
        text: "Delaware"
      },
      {
        id: "FL",
        text: "Florida"
      },
      {
        id: "GA",
        text: "Georgia"
      },
      {
        id: "IN",
        text: "Indiana"
      },
      {
        id: "ME",
        text: "Maine"
      },
      {
        id: "MD",
        text: "Maryland"
      },
      {
        id: "MA",
        text: "Massachusetts"
      },
      {
        id: "MI",
        text: "Michigan"
      },
      {
        id: "NH",
        text: "New Hampshire"
      },
      {
        id: "NJ",
        text: "New Jersey"
      },
      {
        id: "NY",
        text: "New York"
      },
      {
        id: "NC",
        text: "North Carolina"
      },
      {
        id: "OH",
        text: "Ohio"
      },
      {
        id: "PA",
        text: "Pennsylvania"
      },
      {
        id: "RI",
        text: "Rhode Island"
      },
      {
        id: "SC",
        text: "South Carolina"
      },
      {
        id: "VT",
        text: "Vermont"
      },
      {
        id: "VA",
        text: "Virginia"
      },
      {
        id: "WV",
        text: "West Virginia"
      },
    ],
  }
];


$(document).ready(function() {

  var CustomSelectionAdapter = $.fn.select2.amd.require("select2/selection/customSelectionAdapter");

  $('.js-example-basic-multiple').select2({
    data: select2Data,
    placeholder: 'Select a state'
  });

  $('.js-example-custom-multiple').select2({
    data: select2Data,
    placeholder: 'Select a state',
    allowClear: false,
    selectionAdapter: CustomSelectionAdapter
  });

  $('.js-example-custom-multiple-clear').select2({
    data: select2Data,
    placeholder: 'Select a state',
    allowClear: true,
    selectionAdapter: CustomSelectionAdapter
  });

  $('.js-example-custom-multiple-custom-container').select2({
    data: select2Data,
    placeholder: 'Select a state',
    allowClear: true,
    selectionAdapter: CustomSelectionAdapter,
    selectionContainer: $('.foo')
  })
    .on("select2:open", function (e) { console.log("select2:open", e); })
    .on("select2:close", function (e) { console.log("select2:close", e); })
    .on("select2:select", function (e) { console.log("select2:select", e); })
    .on("select2:unselect", function (e) { console.log("select2:unselect", e); });

  $('.js-example-custom-multiple-tags').select2({
    placeholder: 'Select a color...',
    tags: true,
    selectionAdapter: CustomSelectionAdapter
  });

  $('.js-example-custom-multiple-ajax').select2({
    ajax: {
      url: 'https://api.github.com/search/repositories',
      dataType: 'json',
      delay: 250,
      data: function (params) {
        return {
          q: params.term, // search term
          page: params.page
        };
      },
      processResults: function (data, params) {
        // parse the results into the format expected by Select2
        // since we are using custom formatting functions we do not need to
        // alter the remote JSON data, except to indicate that infinite
        // scrolling can be used
        params.page = params.page || 1;

        return {
          results: data.items,
          pagination: {
            more: (params.page * 30) < data.total_count
          }
        };
      },
      cache: true
    },
    placeholder: 'Search for a repository',
    minimumInputLength: 1,
    templateResult: formatRepo,
    templateSelection: formatRepo,
    selectionAdapter: CustomSelectionAdapter
  });

  function formatRepo (repo) {
    return repo.full_name || repo.text;
  }

  $('.js-example-custom-multiple-empty').select2({
    data: select2Data,
    placeholder: 'Select a state',
    selectionAdapter: CustomSelectionAdapter
  });

  $('.js-example-basic-multiple-disabled').select2({
    data: select2Data,
    placeholder: 'Select a state'
  })
  .val(["AK", "HI"])
  .trigger("change");

  $('.js-example-custom-multiple-disabled').select2({
    data: select2Data,
    placeholder: 'Select a state',
    allowClear: false,
    selectionAdapter: CustomSelectionAdapter
  })
  .val(["AK", "HI"])
  .trigger("change");

});
