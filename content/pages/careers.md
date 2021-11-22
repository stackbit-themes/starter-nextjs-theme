---
title: Careers
layout: PageLayout
sections:
  - elementId: ''
    colors: colors-c
    title: We’re growing fast
    subtitle: You should join us.
    feature:
      type: ImageBlock
      url: /images/hero-4.jpg
      altText: Hero section image
    styles:
      self:
        height: auto
        width: wide
        margin:
          - mt-0
          - mb-0
          - ml-0
          - mr-0
        padding:
          - pt-12
          - pb-12
          - pl-4
          - pr-4
        alignItems: center
        justifyContent: center
        flexDirection: col
      title:
        fontWeight: '700'
        fontStyle: normal
        textAlign: center
        margin:
          - mt-0
          - mb-8
      subtitle:
        fontWeight: 400
        fontStyle: normal
        textAlign: center
        margin:
          - mt-0
          - mb-8
      text:
        textAlign: left
        margin:
          - mt-0
          - mb-8
      actions:
        justifyContent: flex-start
    type: HeroSection
  - elementId: ''
    colors: colors-a
    quote: >-
      ## Being part of this team has been incredible. We’ve fill each other’s gaps, and we go to lunch together :)
    name: Carla Rogers
    title: Someone from the team
    styles:
      self:
        height: auto
        width: wide
        margin:
          - mt-0
          - mb-0
          - ml-0
          - mr-0
        padding:
          - pt-36
          - pb-36
          - pl-4
          - pr-4
        justifyContent: center
      quote:
        textAlign: center
      name:
        fontWeight: 400
        fontStyle: normal
        textAlign: center
      title:
        fontWeight: 400
        fontStyle: normal
        textAlign: center
    type: QuoteSection
  - elementId: ''
    colors: colors-a
    text: |
      ![carrers](/images/careers.jpg)
    styles:
      self:
        height: auto
        width: narrow
        margin:
          - mt-0
          - mb-0
          - ml-0
          - mr-0
        padding:
          - pt-12
          - pb-12
          - pl-4
          - pr-4
        justifyContent: center
      title:
        fontWeight: 700
        fontStyle: normal
        textAlign: center
        margin:
          - mt-0
          - mb-2
      subtitle:
        fontWeight: 400
        fontStyle: normal
        textAlign: center
        margin:
          - mt-0
          - mb-8
      text:
        textAlign: center
    type: TextSection
  - elementId: ''
    colors: colors-a
    title: Convinced? check out these open roles
    text: >+
      ### Product


      Director of product management


      **San Francisco**


      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and


      [Apply](https://www.stackbit.com/)




      ### Product


      Director of product management


      **San Francisco**


      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and


      [Apply](https://www.stackbit.com/)




      ### Product


      Director of product management


      **San Francisco**


      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and


      [Apply](https://www.stackbit.com/)

    styles:
      self:
        height: auto
        width: narrow
        margin:
          - mt-0
          - mb-0
          - ml-0
          - mr-0
        padding:
          - pt-12
          - pb-12
          - pl-4
          - pr-4
        justifyContent: center
      title:
        fontWeight: 700
        fontStyle: normal
        textAlign: center
        margin:
          - mt-0
          - mb-24
      subtitle:
        fontWeight: 400
        fontStyle: normal
        textAlign: center
        margin:
          - mt-24
          - mb-8
      text:
        textAlign: left
    type: TextSection
  - elementId: contact-form
    colors: colors-f
    title: Not seeing the right role? Contact us
    text: We might have more roles soon, and we’ll contact you if we think there might be a good match
    form:
      type: FormBlock
      elementId: contact-form
      action: /.netlify/functions/submission_created
      destination: ''
      fields:
        - type: TextFormControl
          name: name
          label: Name
          placeholder: Your name
          isRequired: true
          width: 1/2
        - type: EmailFormControl
          name: email
          label: Email
          placeholder: Your email
          isRequired: true
          width: 1/2
        - type: TextFormControl
          name: home-address
          label: Home address
          placeholder: Your home address
          isRequired: true
          width: full
        - type: CheckboxFormControl
          name: updates
          label: Sign me up to receive updates
          width: full
      submitLabel: Send Message
    styles:
      self:
        height: auto
        width: narrow
        margin:
          - mt-0
          - mb-0
          - ml-0
          - mr-0
        padding:
          - pt-36
          - pb-36
          - pl-4
          - pr-4
        alignItems: center
        justifyContent: center
        flexDirection: row
      title:
        fontWeight: 700
        fontStyle: normal
        textAlign: left
      text:
        textAlign: left
    action: /.netlify/functions/submission_created
    type: ContactSection
---
