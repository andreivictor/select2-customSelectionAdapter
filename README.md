# select2-customSelectionAdapter
An implementation of a custom selection adapter for the Select2 plugin (v4) - multiple mode. Displays the selected tags into a separate section, leaving the search box empty.

![img](https://imgur.com/trAkGul.png)

## Demo ##

https://andreivictor.github.io/select2-customSelectionAdapter/. 


## Usage ##
Initialize the select2 plugin with the `selectionAdapter` option. 

```javascript
var CustomSelectionAdapter = $.fn.select2.amd.require("select2/selection/customSelectionAdapter");

$("select").select2({
    // options 
    selectionAdapter: CustomSelectionAdapter
});
```

## Setup ##

Include the script after Select2 main javascript file:
```html
<script src="select2.js"></script>
<script src="select2.customSelectionAdapter.min.js"></script>
```

## `selectionContainer` Option ##
By default, the tags are added immediately after the `select2` container.
You can use the `selectionContainer` option to add them somewhere else in the page.

```javascript
var CustomSelectionAdapter = $.fn.select2.amd.require("select2/selection/customSelectionAdapter");

$("select").select2({
    // options 
    selectionAdapter: CustomSelectionAdapter,
    selectionContainer: $('.foo')
});
```

## Select2 compatibility ##
- Select2 4+

## Copyright and license ##
The license is available within the repository in the [LICENSE](LICENSE) file.
