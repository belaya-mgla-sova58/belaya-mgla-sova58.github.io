/* Белая мгла: маленькая сова поддержки в шапке главной страницы. Не затрагивает сову-предсказательницу. */
(()=>{'use strict';
const GAME_ID='23027478';
const OWL_SRC='data:image/webp;base64,UklGRqgZAABXRUJQVlA4WAoAAAAQAAAAiwAAiwAAQUxQSKQLAAABDMVt2zjS/munXvlHxASwbEGMK3mBAX9gYnlC1BpxhTyjrCjz1rD9MyRX+/3/VbN7FNsbG8e2bdu2bdv2SfIeKzi2bVuxNVVd1b8PO9nMds2bzxExAV5sbVtt27atFoaRRhBGBIZExWAZNKMakhyzH2oMPyLATJaZmceEWsr/POUT5S8/lRqAiJgA1H6xgqVKXVoQjDyxNXQpAWaZV34bCl1KsNidv3YWrSEqCZVwXs4nUDvEoICixlqtRgnd/4uOa8DUCAFGdYI0h7FiUEURwCh6fUPvOLpWiOiNjy6nqL4KANgRux6y36YtVRangFFg169jlvj1FIjUANHSk1wPpmpigNWvueHab3OSN3cBTKUSNlkdWGciI6kpzoNFDTR4kHP6QpdEjLXWGhFgtfGkJ7P4WS907FKCCGAMhv296drP58yS6hQ3Ye1h0NQMjmPZDV4SY7B4e0nGzEfnw7STb/l15owfTwasAtvM8m+RwUVFD3G3nHwXbGIq/eZkZe6qtpFUEAU6bXncWWceunHr9q8wc7FxPj+SObMJu7QH1nmS9Iw+xiiZ+/D+TyqJGTzAsuOjKDWqKMD6Y6ez4p8/shxixcDoshAycvL1T5MhRB+beIhrNuV/7SFJKbrNiVnI3EaoE8UGXVQEKzxM0rtyuexJHxcbYmXvSQYfYgxN8f93/ZvP7AFNyuJolkPM4pRVgTp56WzUlZY9d8xln4QQG4cshhCWIMbgfIwhNn356xfm0zpAkjJ4dJnQFH8fVw985rbHycnp17/xNwpgV4pYwvMrkxjks0iqKfjloa1fo7v33Bu/jFhQLQApIlNJcvkDMEhZUP9zThz5+18xY0QcklVSRBP1XD8xiH65Ycw8GYJLc1IhQ06toMXEV0SQtBV5dpk2YgwhhqiCgJsAdkZTfLUC6lNSrLwNzolDwWJZWWQlDRS+2Gf/B9tBUhr674A2B6kqBBQcQf5dwMdhkK5gmSmTtn5qmYtC07INssAGK6bEHzqKJgTF8+Tnk+UoFeWQwfqIeKkPFCkb7MxFAQpsrGEDqKhmrbK8f9s5gCJtte/xf6vmYJ4CKBFxlf684MQqUsOgqQG0GzdFXAaTGhTD3lmS/emCauLfkdDUoDi58r8p0atvxim+b6GSnJ72nhH9oMPmgbfDJGeej+Xr76QKULYAOiEuWx0mMeiAdVZaeXIVtEzsJWR8Fppa47H0sbpQRAFNUvzwJgdBUyuZ9ZjFGJqUd0Kc3XDGQTCpGTxKF6tNiSUt0YkXoS1SVwz3IVSDVVuggZr4/TKQ1AzG0lWlHEYw5GupSUzQdpyLzV9AtpHj5bCJwcjtedZ822QVFKgIYVI/aFoGl0aihBUITUCLVEqi5/vGSEqq7X9YktWgbcytFesdr4NNyWJ0zFazyqKoy5aKGWzquBNsOnU4iJMN2bTphuVsZGFGH2gyGDjdJxkDcpLA1rnnnw0qacjyu8wmrUUpABoIVlKQ8e0xpyUi0vL8CXe9saQelozp+RkgSPjlmCsqwbHzjKuKpiJ1ZkSELg6+MOSHwKYCiwv4/y719An85zaemZDqfn+bGlCDkuvtuesTFyRksLufAWqawhivD18LmopIi3+YgW7CACH4vlCkarEPnSsHEPpFchsxCd0bnNkMfewX8mfLR8AmozjidSYVMt3p5bjDAfvCJAOVJzlnHJ0mGdfHskjYYgwnd9kk4++tDJKSY1Jp6ng/YFIy2Ifz0Qhh1u1toemILP8r0/7IxUh+PwKaDtpMJbvDwjKn9BVNBQajOe2ufBFHwyS0NhmGBktdcPmTCUExNuZRhgwuXzOlEm4ahX6EGMu8FgbJWhzF2SNJiJ6v1xlJxmDTkKVjYczir52hSFUxcGbMPILkyjwWJaQqpu5DunhEHV8STcbgCpZjLQ15uTc0EcVwn4UCQBPaxIxrwSRiMJYuLp52tmlKDPn8zpBEgG+iL8SQIETPa2CRqMFVdE3YMwJo9PkdCm2CSJEUHSfFrNlgBNz0HNcC2hQpECxOoqtEu4ZUUBHKfLsFtAkossrIEJsKPSioXQlbYRFfqVepVHBF94UMTaJD+5yFoczRsLIYkQJBdQJ9ExQYgDqAghjLPB02CSOjfGiEMkwtao4N5rAWTCWIFMjiIvpGtYxUuuXMH5ZTqVRkg4Z5eYhCze4db4ItnEHXr5nFiuwEaBI9N4MpmKLhe/pYXJo0z+IfHVQLpdL2O7rYmBV0Y6Do+ASMFkiMTqSLjckcWc/rAVscgwtYjpW3UGlCD1pFz3ENMFIQg7UWfgy54zzF7wdBpBhaOmWLV2Juxxa96OAcvFWhhUA9No6ZdkMCdsbx+eWghRB9LyZgBGhkP2OZL9arFMBgfSZHp2bIMh+FkeZTPMppuDWDRcfrYZtN0XN+zi7WjBQdj0apuSxOoVOUwUAZgJLguB9sM4m8Ty/IaIKlNJMCSewE2yyKoS4ELF8Gab0UAZYnsk2gzWFxDF3wSIm1KZ8xWLQZDMZ9/BxTRXvqaNGX5Pi8mGaAWa/PHzmDNOxDAyLK+RdQaQaLM+jcJap0yC8lLF+/x3J+AUz1RFr8nmeDkRudmeWHs78OjtvBVM1iX/rAWMUMFMHf8ezmXBT/aS3SSvQD+qgyFAqrYUPIf36In3zHdV/nQp4DUyXFSjHEgEIzGrVHEWroeT1mzriPt+3BhfH35SDVsbiA5RhBPI6AguUh/jqfs9o9zEtn/9d/apyfbwpTHcWb9DF6PMxY6Xnua+T5e/OatzjicX7D82CrImg3hSE23tFSBStKHG86j5OmnZSPfyzf5rjw0scri1ZFMSrEkBWLunpcQ4HnxO347C//Zn89H/bZnkeVIKiqwdb0gVEBZATcYeAXK/HVi5l/No67r3KJQlFdi33pw2+RrDKAMF6Zfwye+++as+MuN45pAUBQtQPI1+7kjGiGHuAOA3/5lFMH/JZ1f5kD2wFiUHWLvaNfaSJns+Dx9Tz2jTit33ccsPOhBiJoRoPNeAL+ZpKMxzfL/uzzH13fX8a3BSBoVsGAC9FjLnFIBgEyoULOj7bis/u0HAioQQGlfznP0WtUAGMMMYQQ89/Gnth3qzoAIihiCf0q4e6XZUOCd1NiiDP4OxobKIqp6DqbqYA+UECLLMDXzvBff0Lv3/Lc2FgjKKxgmV8r5LvBRsdp+e6tmMorfpg/aeEtGW+CRZEVL9HHGEMoQN9lyQTyma8Ypu/hv/xjxon5pEntRItkcT5djIF5o92H/IvZl0zNwtPb8Nl//tiYr8y8BqZIimE+xJB/Mz9GkB1QQMziyMHrTiVPPDhe/PsPDe7L67g+TIGgeI3e8cBb6dx50nEcgJ47Pb/6cTxo+gz7mVv3ks2gRTLYlj5kg1v8w3k3y2qJg3OjUBIAaLFWhz32R99BBkVXfZ/8ZXlssNC5BYygEj8/F7wABlCjaKLVghmsy/Ag6rDl/02iUiSMkeK9Ux+5X1VQUYwYC1UU3+A6HgVrcf4hoRJJhZxjMC3PnBxHUTtmbShKOIwuxNz/SBdCUxggsMx9pV5qQRNLuJDee94+jlnMYkXW3QKn51PaQ1AbRSvA4DxyQXxz+dHljKGCaIYqVFgl3rMTD4BBrTXY7g9yeksM3+LrGDLbYJb5LMYYMoXz8oip3xCC2mvQ7vxvp3ZSYF1mGTZMkGTwYcniORgIarEBTIOizpyZL5jmJMiESsSnv13+CklHhsw0Hf6fb4E61GaxAKB4hY1hmiJidvLbM5ZpDaxy+BQuhwl1mmaN9ViYGgWIAoKP8/PuvO7J5RDx9QM/xhRx7YlAAQx74o+IgENEzMvTTz55f/gGtd3g8YsAtJrO/+3VFqv96b7ZElYEUAv0PHPirPztISc9+j5DA4AdH4HUNEGnOlOq04++BVCPo7gWLCqrAliPVwDAUwta2pKB4v+hYq2VpU5E2xwNgyaqtTh4kJZK6LELFFDUfBE0XbCEisaCypICVlA4IN4NAAAwOgCdASqMAIwAPsFSn0qnpKKhsPccaPAYCWQAz9S+ksN/dT47ttX0k7djnifSJ/qt873kr+4YLX/bu3fvl8sAVY3bAIxL7Q05Lw7rp/pfsB/oD/per3oL1Cf1q9Nr2meir+yTkfOaRPS4h67vNMnYmdnaZijKRr+tWF+0HfC/fT491HpIGn/d7ITWwgkFwyQfCBlaFTDS4TOp9u22YPfksi1lq2Z3VBAps9b/NvELQtQI89TJRb/jeRxj/+r3+Z93ycheNmZrcOSFxIMJ8RC+8OpXAeyJuhDFepBstmRv5X2LbP1L4nE4hH3ykBb2VRX7uP0Ti9zxKZ7gVg4CROQYR+iu5TNMjqXyp9hg2DkfxsIZlbLZNXafQxvFVWDOTaXxXpdeeLGl8w1u/VK+B6k3x/Dge2kZhVC1yoXvAiGf846ftpOSpN4jyTFG/xukw+vEd0Elb6a0f6Js4++UOQu8o+60UJembW2x9L/te7HLMgDxJoc2v/0SI1sB53L5TRKbACJn/lGTqXXGISIgaKu0qv9WwdIcXLSkux6Gg8hoMyOkZ0ZpAn8c7K8yENDPtYmyvi+gyyVnE+8V6N3lB5clxAv/Zimep327F22949zELmEnzRa8ippg8oAA/vz4Rm+J1VEhT4GoZoZSwkffYwYXZMDIq+57m8PKgWH0W/Hv0t9l/6eruCOr8ero91CAB/Fqv7tsdE11cMZKhDWZLhWAWAQO4/4w5Mr6WOLwCyHSm+8wv4/mk/cpTYfHsd0Zle3qdvJ4jtwAbqxWTbp3yCiN8dmXr867lT1j799IGcnDVYUT5BtGtZAasEJSfnkmzwkqvlCB54kxPSWGr0a7pSQJ93YwWKck5RBda/jwk9zBB2xbpklTyU6m1KPYXp8owgAooVaANBqka67prc2GWtlHXTGSV+5uD/QV6RnD1aYT6akfpLHjMayUcrPKYmch9AVYzk9Vs6vVrC721WgQrCDM2qCC7gwtWVc2rh6f5xRzlhlAKFTfqyzkSu+LrY2BJhYEYu8kJfyds1zXoXo/zt1rEnYLcysEdjJR/qNkszooUblvC//LtGSY0m29Vfuf8ubf+Q8okxDeABe9YCB0B6GCCuMNxXvS8U3h67hoDzFcPa+6oCbFTT3yvbZB7kd5n7bbx7le8T5/V0Jo0UyNhfURkmRNBeng3A1I2lgh7nJmxxOq6SKyf3vfaFI1kVtWDpZ4FdDd5Wz5dvwcsZjM/+g3ED4iq0PHihfb0eTrjPnWCDdoRFDx52gez/fSsi6ZGnDPgttMnv0mLe6SiiCkCnvkpaMU3JtqFgxaaNJiI1IHPRjnhKBw1QSoP+oH06WA3+HdImlr6sd2EMNRlSXmORlnXgyvh8fW6cHLATWzP4GRrIcYIgCyPAjmemWRwCgBjqEYxR1kpWgYXshzyA5OQWynJl8mFvSbhPa0qjWnhPUiClZ70epK+jMgE87dYuviyVzvFZAazyZtQbEKmFoBsWbkX9gaGXmGMJR1z0WGO3S6hjFf4XLoGw5aZKVMziVdzItj2rRQ/milStdF0cKbeIEZltqC7zW6P47Guma/epLN5F+AIlG3yJWtX2ea5k0yHk8OP2sUbhecbWMlywlBBZ668TXBxf/2TPOLuZpObP2EC7lpqchMd+1wf4OFFvlEOf3J77KzUyGbyJvYlN1lgPRid6j2x1Gc6JLglDyyyrX9PFqE88PljddsJthlLrO3TfUR/ft63Kxqw7f+yoyas9GB/WvdFAwQRl7kTIu3QbW1Ki9o/z0xceglFP616V65UJmFdklJn0H1p2pkTEx5C92vpIyPYcY7EYTLS54F5eODv0L5uyEusTD37BYBfyzmDBiyotXaJBTZhQsB/ULB6mS8aTD5HQLY+FcqpsxXt4wdGav+3qQBHlKibsRCBzWrJRJJrvkyCfhlwmhqx+uTZNyd6D38MOCSOsmKio4HV8Sr7ILV40AlTPNa9thMDq+pQ7Gb1TbcOjPgcVlSMWyWcabismdSoA4Iv/aIJm/Ou/Nvhhf86xRENWkxBmNsG0mb5GSnIxWXdmD1dn3L3pxjoRMVfFg3YX6QjAg/rsTAKQqWaLbUILDvs6/vzRO49Cz5Pt1glHPofJ2ozrdwMrdFlOO32a1ZswwSfXlTkPaGw2YY+UOmIndrSHKiMV1xgfKK/TP8cm+QvrLwKukoN2kDgesoVJURX7s7JTpn/aOPjEzZnh7XjfXeAbVmiVI7T5TqKA1TQ4SUGPX3c0upKJvY8Lhrga6V596gSS39Crk6eIDw7bqxbdohn3UFo1uMbeKKbVzfa3XGw4AmFMt562SM531Uty1YAf5l5bEDB0Ve2LGaXvO00FiCgwC2DeZ01jxAdfwauLbYno0eWHdcw2vKGxjf4j9GbqCKt7w9Pcld2rBdODr90bAVb2Xqk/CphNM8B2uFzMIoK5ornjRcETvfWfoGfbAVPq1fUh4wWTVxSL/Ad19U7kOtqwcuUlpuM3gdXUJuCRg901GG/Q6WHYGZsqIgr2jy50Is9l9gdfByP4bUKM4YRi35rky/pLO82JvV4dRxrOifYoD2D50d6ZMCI5yVeQfIJ8PtoI6g6XfPH1WJjiCLX+St4kbXlXIrZ5x24flI8B1iGN0Y9BkTDrDtccga8kVtERsX0Ua5XLjpIfKsw3Hm2vn0RED2V+s956PweGXVAt6MbyX6eGx5m4f9c+1LqrO2jy2ohH46ZkP1iNtaux9+NLjAe4m8JS8JNomQw6Si6ZlEfxzUHaJ8hGSZ5lCtdmLI5su4CZz08espsgG5qdLfIBkNCdoIjuZtazBg067A3fMZ0mePd5cLLNWcO2FlAJsLC9nSWpnVV+v/k1HeKaCsf7tKwOECBl+J+hj8EywezxheqCajHBLfFgt9glrYLl0sgsqj+h7TPx/1Y+FSWqNNtk1pFrgh4Na4uUp+8HSfAAoLt83qXDWH3q5ZCa+/r885pc0+hDX83vYzsEKWSTl2TEvv9Z+0eAXlOiqe52REYpN64wMDShrwr/w4YkS4wqtjxaljn0lzmggl9RX02gCDSK93J43IceqDmci909HJ95lEgKpRgSaz/h/YDDBd+sxcSUVPcrjQbiOZTSY2Co8ddV7Keh60L/eOO6pWVW2TzmumCABumUgE4d4IrXnblJ2B4e9+OWLA3kIK4nyW6Cpj+VFPPhcyNzfMH+G3Ukbcv4djzYAzrro8vwTxrKrsC62O4F/zHZF+LLYaYxLrRaQZfUlYJafapeAUPBZB0xNcqmqVxaTz+8w8q9mB7dORA17Timau4k7ZdQ96ppqfkTfiOX77TgzHO7kKyOrrqPH3lgl4jbc3payNCFtRirW0dziyiw3a4lh2iCFtSxOpH8Wm6i3vp6CgMP3oZJCXFwgdBhIzHUvYfUH+yXs4ZEFg/reDDq7nT0nrQaOcjfjSh3b9cCIcKSfbCEKu/WhC5+guBucnL+Fc1XIFiUPQniKhH9MM9X0PniWKYN27/dW1Cu7zBmz6wj4N9Jrxn9A7b15yYRwy8MRrgFLwf6EKk4LcoaTcJmtSJse09QtzebHgJ3mqLcoLTXfVCSUEjsZN/oENOVrvJY7tLVfm1L/jXDiAdl9NY6rlaNm7ZL/adlu96kxJyFPkYdz0O239iVnq2Jjj49rkq5+cw4xl/2G6WKkqMRAfCulxhbZYm+ZQPTB184V+hsoKDCY+UnHqTspovNEtluD0aKWZnvg6RPgdNYbRnDT4OGzwhNWUFZ9RuYZlxBfxj4LVU9gWLDWyt5FN/8cjnyYmRLtnxNIoIg5kpcM2J+u0Ewjv3/iNrYmOci80NwE1TztfolNx6vxQFfjv2PvwBwXgilfTN1c25vn+D3JS85gSewl1HAfwhCyRwRqy1rOUiaNuY3wwNgWbQCI+5lZ0uye0nQmcOvSjSrNS5FpLCcxjVKLW/XPpeJcUsAELqk3Nxtc3vFVKV4AQL/bE4bCMt/AU1jGQf1g+c295Cdp8facepfu2f1lKxICkJSLM+51Xi1ZV6PTcn7TpOue3KQb9J2RVAYm9EncJmaC++vTsXjlw4alKhb89qytWR8RcEkqGiN6j3naCzezVoKFNCn94ejvp15PqLtSuPTCTgcJ4eI44EthxN5wTPQPKi0o0M3X8v+krzc03VluWVdkbfn+S1SWNNMIXP9yUMHZcrK2Jkwgf3g1GPH5k0Pc16VUOcII0DKFlpmrvcmij5OSWZyO5ojkThnr7unTacfMPaTeC3Ohp1OYSoDk5G+VpD8M1XfX96XJnRFphCYM4/eaxiw4fwkpoCCLCW+KCva9z9J8mJx+wVoBAQZaOQ/fzk9PZvVEP/HT+YAQ+YYBeVvns6M0u9G/oVqfy2Oy0bQtLjWfTp09fmDEIiUrqjIcGDuVrfjrSOUh6ZVfc+K6bI8CklT6NlDcOQyTTiuQEa2scm6AwzRy5Ph4GiIJzJKdLwbKsGkUTJB4DApIut+9uFrw0BefKEjaPaBdAbdAa6pAX1XUHfBNaeP2tEz9lRFDD2X985qpiZOtQwKhxSVPB3nf4T+xM0loayjfXwgaCA1U6/Quv4xi9wmSVjmT9sZMVWPiAZH5I7ZvfWCFnhFZB6W5Lvf4FYogxc5zc/9sp0kjWkjkbxDtEZN+gCmQXnhm7JRfL4b/a8dmdXIylOPuqiS/0xCLB2wOWfg9PD7b/1js/c+57S/uvOOOjA+koP6gvQNrUnwtRK67Fg82gNYAAAAAA';
function init(){
  if(document.getElementById('sovaSupportTrigger'))return;
  const hero=document.querySelector('body.is-home-route .route-page[data-route="home"] .modern-home-hero-v424');
  if(!hero)return;
  const style=document.createElement('style');style.id='sova-support-v1-css';
  style.textContent=`
  body.is-home-route .route-page[data-route="home"] .modern-home-hero-v424{position:relative!important}
  #sovaSupportTrigger{position:absolute!important;z-index:25!important;right:13px;bottom:12px;width:88px;height:88px;margin:0!important;padding:4px!important;display:flex!important;align-items:center;justify-content:center;cursor:pointer;border:1.5px solid #efc787!important;border-radius:50%!important;background:radial-gradient(circle at 38% 22%,rgba(134,71,166,.82),rgba(34,22,41,.92) 76%)!important;box-shadow:0 0 0 4px rgba(41,21,47,.36),0 5px 25px rgba(167,83,212,.42)!important;transition:transform .18s ease,box-shadow .18s ease;isolation:isolate;line-height:1!important;min-width:0!important;min-height:0!important}
  #sovaSupportTrigger:hover,#sovaSupportTrigger:focus-visible{transform:translateY(-3px) scale(1.04);box-shadow:0 0 0 4px rgba(41,21,47,.46),0 0 25px rgba(199,121,252,.68)!important}
  #sovaSupportTrigger:focus-visible{outline:3px solid #f8deac!important;outline-offset:3px}
  #sovaSupportTrigger img{display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;object-position:center!important;filter:none!important;max-width:none!important;max-height:none!important;background:none!important;border:none!important;box-shadow:none!important}
  #sovaSupportLayer[hidden]{display:none!important}
  #sovaSupportLayer{position:fixed!important;inset:0!important;z-index:2147482000!important;display:grid!important;place-items:center!important;padding:16px!important;font:400 14px/1.5 system-ui,-apple-system,Segoe UI,sans-serif!important;color:#f3e9ee!important;box-sizing:border-box!important}
  #sovaSupportLayer *,#sovaSupportLayer *::before,#sovaSupportLayer *::after{box-sizing:border-box}
  #sovaSupportLayer .sova-support-shade{position:absolute;inset:0;background:rgba(11,8,16,.65);backdrop-filter:blur(4px);cursor:pointer}
  #sovaSupportLayer .sova-support-dialog{position:relative;width:min(100%,370px);max-height:calc(100dvh - 32px);overflow:auto;padding:20px 21px 18px;background:radial-gradient(circle at 10% 0%,rgba(94,49,111,.36),transparent 48%),linear-gradient(155deg,#30242f,#1c191f 65%);border:1.5px solid #e6bb7f;border-radius:22px;box-shadow:0 24px 85px rgba(0,0,0,.65),0 0 35px rgba(181,92,207,.22);text-align:center;scrollbar-width:thin;scrollbar-color:#9a6c93 #292129}
  #sovaSupportLayer .sova-support-close{position:absolute;right:9px;top:9px;width:33px;height:33px;padding:0!important;border:1px solid #bea06f!important;background:#3d2b3b!important;color:#f8d9b6!important;border-radius:50%;font:700 24px/1 system-ui!important;cursor:pointer;display:grid;place-items:center}
  #sovaSupportLayer .sova-support-close:hover{background:#694361!important}
  #sovaSupportLayer .sova-support-owl{display:block;width:89px;height:89px;object-fit:contain;margin:0 auto -3px;filter:none!important;border:0!important;background:none!important}
  #sovaSupportLayer .sova-support-kicker{color:#d7b6e6;font-size:11px;letter-spacing:.09em;font-weight:800;text-transform:uppercase}
  #sovaSupportLayer .sova-support-title{margin:7px 10px 13px!important;color:#f5d29a!important;font:700 25px/1.13 Georgia,serif!important;text-shadow:0 0 20px #bc854f55}
  #sovaSupportLayer .sova-support-title span{color:#dec4f8}
  #sovaSupportLayer .sova-support-dialog p{color:#f2e9e9!important;font-size:13px!important;line-height:1.52!important;margin:10px 0!important;padding:0!important;text-align:center!important}
  #sovaSupportLayer .sova-support-id{margin:16px 0 12px;padding:12px;border:1px solid rgba(229,185,119,.75);border-radius:14px;background:#382a3b;box-shadow:inset 0 1px rgba(255,238,209,.06)}
  #sovaSupportLayer .sova-support-id-label{color:#e4c394;font-size:12px;font-weight:800}
  #sovaSupportLayer .sova-support-id-row{display:flex;align-items:center;justify-content:center;gap:9px;flex-wrap:wrap;margin-top:7px}
  #sovaSupportLayer .sova-support-id-num{color:#fff4e6;font:bold 25px/1.25 Georgia,serif;letter-spacing:1px;font-variant-numeric:tabular-nums;user-select:all}
  #sovaSupportLayer .sova-support-copy{border:1px solid #e4bb85!important;background:linear-gradient(160deg,#614064,#392540)!important;color:#fff3d9!important;padding:8px 10px!important;border-radius:9px!important;font:800 12px/1.2 system-ui!important;cursor:pointer;min-height:36px}
  #sovaSupportLayer .sova-support-copy:hover{filter:brightness(1.12)}
  #sovaSupportLayer .sova-support-status{font-size:12px;min-height:17px;color:#e1c992;margin-top:4px}
  #sovaSupportLayer .sova-support-aside{font-style:italic;color:#cbb2cd!important}
  #sovaSupportLayer .sova-support-thanks{border-top:1px solid #b890706e;margin-top:15px;padding-top:12px;color:#e8c78e;font-weight:800;font-size:13px}
  @media(max-width:820px){#sovaSupportTrigger{right:8px;top:8px;bottom:auto;width:60px;height:60px;padding:3px!important}#sovaSupportLayer .sova-support-dialog{width:min(100%,350px);padding:16px 16px 15px;border-radius:18px}#sovaSupportLayer .sova-support-owl{width:69px;height:69px}#sovaSupportLayer .sova-support-title{font-size:23px!important}}
  @media(max-width:420px){#sovaSupportTrigger{width:55px;height:55px}#sovaSupportLayer .sova-support-title{font-size:21px!important}}
  @media(prefers-reduced-motion:reduce){#sovaSupportTrigger{transition:none!important}}

  /* Gift owl v1250: dedicated, noticeable bottom-right control. */
  @keyframes sovaGiftFloatV1250{
    0%,100%{transform:translate3d(0,0,0) scale(1)}
    50%{transform:translate3d(0,-7px,0) scale(1.035)}
  }
  @keyframes sovaGiftGlowV1250{
    0%,100%{box-shadow:0 0 0 3px rgba(242,208,149,.15),0 0 12px rgba(171,96,227,.45),0 5px 18px rgba(0,0,0,.36)}
    50%{box-shadow:0 0 0 5px rgba(242,208,149,.28),0 0 27px rgba(206,141,255,.84),0 6px 23px rgba(0,0,0,.46)}
  }
  html body.is-home-route #sovaSupportTrigger{
    position:fixed!important;right:13px!important;left:auto!important;
    top:auto!important;bottom:96px!important;
    width:70px!important;height:70px!important;
    z-index:2147483050!important;
    padding:4px!important;
    transform-origin:center bottom;
    animation:sovaGiftFloatV1250 3.2s ease-in-out infinite,sovaGiftGlowV1250 3.2s ease-in-out infinite!important;
    -webkit-tap-highlight-color:transparent;
  }
  html body.is-home-route #sovaSupportTrigger:focus-visible{
    outline:3px solid #ffdf9c!important;outline-offset:4px!important;
  }
  html body.is-home-route #sovaSupportLayer{
    z-index:2147483500!important;
  }
  @media screen and (max-width:820px){
    html:not(.force-desktop-root) body.is-home-route #sovaSupportTrigger{
      top:auto!important;left:auto!important;right:9px!important;
      bottom:calc(112px + env(safe-area-inset-bottom,0px))!important;
      width:82px!important;height:82px!important;
    }
    /* Two different owls should not sit on top of each other. */
    html:not(.force-desktop-root) body.is-home-route #madamUguLauncherV720{
      bottom:calc(216px + env(safe-area-inset-bottom,0px))!important;
    }
    html:not(.force-desktop-root) body.is-home-route.mobile-menu-open #sovaSupportTrigger,
    html:not(.force-desktop-root) body.is-home-route.mobile-nav-open #sovaSupportTrigger{
      visibility:hidden!important;pointer-events:none!important;
    }
  }
  @media screen and (max-width:820px) and (max-height:570px){
    html:not(.force-desktop-root) body.is-home-route #sovaSupportTrigger{
      width:66px!important;height:66px!important;bottom:calc(91px + env(safe-area-inset-bottom,0px))!important;
    }
    html:not(.force-desktop-root) body.is-home-route #madamUguLauncherV720{
      bottom:calc(179px + env(safe-area-inset-bottom,0px))!important;
    }
  }
  @media(prefers-reduced-motion:reduce){
    html body.is-home-route #sovaSupportTrigger{
      animation:none!important;
      box-shadow:0 0 0 3px rgba(244,204,142,.27),0 0 16px rgba(190,111,253,.65)!important;
    }
  }

  `;
  document.head.append(style);
  const button=document.createElement('button');button.type='button';button.id='sovaSupportTrigger';button.title='Поддержать Сову в игре';button.setAttribute('aria-label','Поддержать Сову в игре');button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls','sovaSupportLayer');
  const img=document.createElement('img');img.src=OWL_SRC;img.alt='';img.width=80;img.height=80;img.decoding='async';button.append(img);document.body.append(button);
  const layer=document.createElement('div');layer.id='sovaSupportLayer';layer.hidden=true;
  layer.innerHTML=`<div class="sova-support-shade" data-sova-close></div><section role="dialog" aria-modal="true" aria-labelledby="sovaSupportTitle" class="sova-support-dialog"><button class="sova-support-close" type="button" aria-label="Закрыть окошко" data-sova-close>×</button><img class="sova-support-owl" src="${OWL_SRC}" alt="Милая белая сова с подарком"><div class="sova-support-kicker">🦉 Маленькая совиная просьба</div><h2 class="sova-support-title" id="sovaSupportTitle">Сова не кит,<br><span>но тоже любит подарочки</span> 💜</h2><p>До китовых запасов мне далеко, зато энтузиазма хоть отбавляй! 😂</p><p>Если вдруг захотите порадовать Сову подарочком в игре, буду очень рада! 💜</p><div class="sova-support-id"><div class="sova-support-id-label">🎁 Мой игровой ID</div><div class="sova-support-id-row"><span class="sova-support-id-num">${GAME_ID}</span><button type="button" class="sova-support-copy" id="sovaSupportCopy">⧉ Копировать</button></div><div class="sova-support-status" role="status" aria-live="polite" id="sovaSupportStatus"></div></div><p class="sova-support-aside">Сова, конечно, птица гордая… но от маленькой порции доната крылья не отвалятся! 😏✨</p><div class="sova-support-thanks">Спасибо каждому за поддержку! ❤️</div></section>`;
  document.body.append(layer);
  const close=()=>{layer.hidden=true;button.setAttribute('aria-expanded','false');button.focus({preventScroll:true});};
  const open=()=>{layer.hidden=false;button.setAttribute('aria-expanded','true');layer.querySelector('.sova-support-close').focus({preventScroll:true});};
  button.addEventListener('click',()=>layer.hidden?open():close());
  layer.querySelectorAll('[data-sova-close]').forEach(el=>el.addEventListener('click',close));
  document.addEventListener('keydown',e=>{if(layer.hidden)return;if(e.key==='Escape'){e.preventDefault();close()}else if(e.key==='Tab'){const focusables=Array.from(layer.querySelectorAll('button'));if(e.shiftKey&&document.activeElement===focusables[0]){e.preventDefault();focusables[focusables.length-1].focus()}else if(!e.shiftKey&&document.activeElement===focusables[focusables.length-1]){e.preventDefault();focusables[0].focus()}}});
  layer.querySelector('#sovaSupportCopy').addEventListener('click',async()=>{
    let ok=false;
    try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(GAME_ID);ok=true}}catch(_){ }
    if(!ok){const input=document.createElement('textarea');input.value=GAME_ID;input.setAttribute('readonly','');input.style.cssText='position:fixed;left:-9999px;top:0';document.body.append(input);input.select();try{ok=document.execCommand('copy')}catch(_){ }input.remove()}
    layer.querySelector('#sovaSupportStatus').textContent=ok?'✅ ID скопирован!':'Выделите номер и скопируйте его вручную.';
  });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
