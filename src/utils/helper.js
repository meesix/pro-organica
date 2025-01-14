const findImageOwner = (arr1, arr2) => {
  return arr1.map(item => {
    let temp = arr2[item.id];
    if (arr2[item.id]) {
      item["image"] = temp;
      return item;
    } else {
      return item;
    }
  });
};

export function buildLink(slug) {
  const windowGlobal = typeof window !== 'undefined' && window;

  if (windowGlobal && windowGlobal.location.pathname.includes("uk-UA")) {
    return `/uk-UA/${slug}`;
  } 
  return `/${slug}`;
}

export default findImageOwner;


export function isDevEnvironment() {
  const meta = document.querySelector('meta[name="note"]');
  if (meta) {
    return meta.content === 'environment=development'; 
  } else {
    return false;
  }
  
}