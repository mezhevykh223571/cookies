Cookie.prototype = {
  get: function (cookieName) {
    const cookies = document.cookie.split(';')

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split('=')
      const cookieKey = decodeURIComponent(cookie[0].trim())
      const cookieValue = cookie.length > 1 ? cookie[1] : ''

      if (cookieKey === cookieName) {
        return decodeURIComponent(cookieValue)
      }
    }

    return false
  },
  set: function (name, value, options) {
    if (options && options instanceof Date) {
      options = {
        expires: options
      }
    }

    let cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value)

    if (options && typeof options == 'object') {
      if (options.expires) {
        (options.expires = new Date(options.expires).toUTCString())
        const c_value = escape(value) + ((options.expires === null || options.expires === undefined) ? '' : '; expires=' + options.expires)

        cookie += '; expires=' + c_value
      }

      if (options.path) {
        cookie += '; path=' + options.path.toString()
      }

      if (options.domain) {
        cookie += '; domain=' + options.domain.toString()
      }

      if (options.Secure === true) {
        cookie += '; secure'
        console.log(options.Secure)
      }

      if (options.HttpOnly === true) {
        cookie += '; HttpOnly'
        console.log(options.HttpOnly)
      }
    }

    document.cookie = cookie
  },
  remove: function (name, path, domain) {
    if (this.get(name)) {
      document.cookie = name + '=' + ((path) ? ';path=' + path : '') + ((domain) ? ';domain=' + domain : '') + ';expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
  },
  all: function () {
    if (document.cookie === '') {
      return {}
    }

    let cookies = document.cookie.split('; '), result = {}

    for (let i = 0, l = cookies.length; i < l; i++) {
      let item = cookies[i].split('=')

      result[decodeURI(item[0])] = decodeURI(item[1])
    }

    return result
  }
}

let _Cookie = null

const cookie = function (name, value, options) {
  const argm = arguments

  console.log(this)

  if (!_Cookie) {
    _Cookie = Cookie()
  }

  if (argm.length === 0) {
    return _Cookie.all()
  }

  // if (argm.length === 1 && name === null) {
  //   return _Cookie.remove()
  // }

  if (argm.length === 2 && !value) {
    console.log(123)
    return _Cookie.remove(name)
  }

  if (typeof name == 'string' && !value) {
    return _Cookie.get(name)
  }

  if ((typeof name === 'string' && value) || isPlainObject(name)) {
    return _Cookie.set(name, value, options)
  }
}

for (const a in Cookie.prototype) {
  cookie[a] = Cookie.prototype[a]
}

// function getKeys (obj) {
//   let names = [], name = ''
//
//   for (name in obj) {
//     names.push(name)
//   }
//   return names
// }
//
function isPlainObject (obj) {
  obj = JSON.stringify(obj)

  if (typeof obj !== 'string' || !/^\{[\s\S]*\}$/.test(obj)) {
    return false
  }

  return true
}

// function isArray (arr) {
//   return arr instanceof Array
// }
//
// function toArray (value) {
//   return Array.prototype.slice.call(value)

function Cookie () {
  if (!(this instanceof Cookie)) {
    return new Cookie()
  }
}

export default cookie
