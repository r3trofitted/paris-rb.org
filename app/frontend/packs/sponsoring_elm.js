import Elm from '../elm/Sponsoring'

document.addEventListener('DOMContentLoaded', () => {
  var app = Elm.Sponsoring.embed(document.getElementById('main'));

  Stripe.setPublishableKey(process.env.STRIPE_PUBLISHABLE_KEY)
  app.ports.askForToken.subscribe((creditCardModel) => {
    Stripe.card.createToken({
      number: creditCardModel.ccNumber,
      cvc: creditCardModel.cvc,
      exp: creditCardModel.expiration
    }, stripeResponseHandler)
  })

  function stripeResponseHandler(status, response){
    var token = (status == 200 ? response.id : "")

    app.ports.receiveStripeToken.send(token)
  }
})