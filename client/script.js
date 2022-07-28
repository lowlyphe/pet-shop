const $button = $('.myButton');
const $petid = $('.petid');
const $search = $('.searchBtn');
const $update = $('.update')
const $createForm = $('.createForm');
const $updateForm = $('.updateForm');
const $deleteForm = $('.deleteForm');
const $delid = $('.delid');
const $name = $('.name');
const $age = $('.age');
const $kind = $('.kind');
const $owner = $('.owner');
const $upname = $('.upname');
const $upage = $('.upage');
const $upkind = $('.upkind');
const $upowner = $('.upowner');
const $upid = $('.upid');
const $create = $('.create');
const $delete = $('.delete');
const $results = $('.results')

$button.click(() => {
    $.get('/api/pets', (data) => {
        console.log(data)
        for (let i in data) {
            $resultsBox = $('<ul></ul>').addClass("border-solid border-2 border-black").appendTo($results).html(`<li>Pet Name: ${data[i].name}</li><li>Pet Age: ${data[i].age}</li><li>Pet Kind: ${data[i].kind}</li><li>Owner: ${data[i].owner}</li><li>ID: ${data[i].id}</li>`)
        }

    })    

})

//get pet id from user
let petid;
$petid.change(() => {
    petid = parseInt($petid.val());
})
$search.click(() => {
    if (typeof petid === 'number') {
        $.get(`/api/pets/${petid}`, (data) => {
            console.log(data)
        })
    }

})

//create pet
let name;
let age;
let kind;
let owner;
$createForm.change(() => {
    name = $name.val();
    age = parseInt($age.val());
    owner = parseInt($owner.val());
    kind = $kind.val();    
})

$create.click(() => {
    $.ajax({
        type: "POST",
        url: "/api/pets",
        data: JSON.stringify({"name":name, "age":age, "kind":kind, "owner":owner}),
        success: res=> console.log(res),
        contentType: "application/json"
    });
})

//update pet
let upname;
let upage;
let upkind;
let upowner;
let upid;
$updateForm.change(() => {
    upname = $upname.val();
    upage = parseInt($upage.val());
    upowner = parseInt($upowner.val());
    upkind = $upkind.val();    
    upid = parseInt($upid.val());
    console.log(upname, upage, upkind, upowner, upid)
})

$update.click(() => {
    $.ajax({
        type: "PATCH",
        url: `/api/pets/${upid}`,
        data: JSON.stringify({"name":upname, "age":upage, "kind":upkind, "owner":upowner}),
        success: res=> console.log(res),
        contentType: "application/json"
    });
})

// delete
let delid;
$deleteForm.change(() => {
    delid = $delid.val();
})

$delete.click(() => {
    $.ajax({
        type: "DELETE",
        url: `/api/pets/${delid}`,
        success: res=> console.log(res),
        contentType: "application/json"
    })
})
