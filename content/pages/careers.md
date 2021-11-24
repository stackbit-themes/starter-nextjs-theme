---
title: Careers
layout: PageLayout
sections:
  - elementId: ''
    colors: colors-f
    title: We’re growing fast
    subtitle: You should join us.
    media:
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
        textAlign: center
      subtitle:
        textAlign: center
      text:
        textAlign: left
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
        textAlign: center
      title:
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
        textAlign: center
      subtitle:
        textAlign: center
      text:
        textAlign: center
    type: TextSection
  - colors: colors-a
    elementId: ''
    title: Convinced? check out these open roles
    items:
      - type: FeaturedItem
        title: Product
        text: >
          Director of product managment


          **San Francisco**


          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
        styles:
          title:
            textAlign: left
          text:
            textAlign: left
        actions:
          - label: Apply
            altText: Apply
            url: /
            showIcon: true
            icon: arrowRight
            iconPosition: right
            style: link
            elementId: ''
            type: Link
      - type: FeaturedItem
        title: Engineering
        text: >
          Head of eng


          **San Francisco**


          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
        styles:
          title:
            textAlign: left
          text:
            textAlign: left
        actions:
          - label: Apply
            altText: Apply
            url: /
            showIcon: true
            icon: arrowRight
            iconPosition: right
            style: link
            elementId: ''
            type: Link
      - type: FeaturedItem
        title: Product
        text: >
          Director of product managment


          **San Francisco**


          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
        styles:
          title:
            textAlign: left
          text:
            textAlign: left
        actions:
          - label: Apply
            altText: Apply
            url: /
            showIcon: true
            icon: arrowRight
            iconPosition: right
            style: link
            elementId: ''
            type: Link
      - type: FeaturedItem
        title: Product
        text: >
          Director of product managment


          **San Francisco**


          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
        styles:
          title:
            textAlign: left
          text:
            textAlign: left
        actions:
          - label: Apply
            altText: Apply
            url: /
            showIcon: true
            icon: arrowRight
            iconPosition: right
            style: link
            elementId: ''
            type: Link
    columns: 1
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
          - pt-28
          - pb-28
          - pl-4
          - pr-4
        justifyContent: center
        borderRadius: none
        borderWidth: 0
        borderStyle: none
        borderColor: border-dark
      title:
        textAlign: center
      subtitle:
        textAlign: center
      actions:
        justifyContent: flex-start
    type: FeaturedItemsSection
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
        submitLabel:
          textAlign: center
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
        alignItems: center
        justifyContent: center
        flexDirection: row
      title:
        textAlign: left
      text:
        textAlign: left
    type: ContactSection
---
