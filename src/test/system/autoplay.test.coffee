require 'should'

START_DELAY = 1
KEYSTROKES_DELAY = 150
END_DELAY = 200

setTimeout ->
    Array::map
      .call '→↑←↓→', (d) ->
        switch d
          when '←' then 'ArrowLeft'
          when '↑' then 'ArrowUp'
          when '→' then 'ArrowRight'
          when '↓' then 'ArrowDown'

      .reduce (promise, code) ->
          promise.then ->
            new Promise (resolve, reject) ->
              try
                document.dispatchEvent new KeyboardEvent 'keydown', {code}
                document.dispatchEvent new KeyboardEvent 'keyup', {code}
                setTimeout resolve, KEYSTROKES_DELAY
              catch e
                reject e
        , do Promise.resolve

      .then ->
        new Promise (resolve) -> setTimeout resolve, END_DELAY

      .then ->
        document.querySelector('.PLAYER').style.transform.should
          .equal 'translate(200%, 1500%)'
        document.body.style.backgroundColor = '#a3ffa3'
        document.body.innerText = '✔️'

      .catch (e) ->
        document.body.style.backgroundColor = '#ffa3a3'
        document.body.innerText = '❌ ' + e
  , START_DELAY
