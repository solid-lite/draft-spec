![image](https://github.com/solid-lite/draft-spec/assets/65864/d9b22bad-de6c-4f8a-97ec-827b1caafa56)

Version 0.0.0 `pre-draft` `author:melvincarvalho`

## Solid-Lite Protocol Overview

### 1. Introduction

Introduction

The vision of a decentralized web, built on the principles of Social Linked Data, seeks to redefine how we perceive data ownership and collaboration. To universalize this concept, it's paramount to introduce a protocol that appeals to a wide spectrum of developers and innovators.

Presenting Solid-Lite. Grounded in the tenets of Social Linked Data, this protocol offers a balance of elegance and potency. Conceived for expansive adaptability, Solid-Lite caters to a myriad of applications, from safeguarding personal records to powering intricate collaborative platforms. Its design aims to make the complexities of decentralized data accessible, providing tools that empower developers to craft solutions which prioritize user autonomy and innovation.

### 2. Hypertext Transfer Protocol (HTTP)

#### 2.1 HTTP Server

Servers MUST conform to HTTP/1.1 Message Syntax and Routing [[RFC7230](https://solidproject.org/TR/protocol#bib-rfc7230)] and HTTP/1.1 Semantics and Content [[RFC7231](https://solidproject.org/TR/protocol#bib-rfc7231)].

Servers MUST conform to HTTP/1.1 Conditional Requests [[RFC7232](https://solidproject.org/TR/protocol#bib-rfc7232)]. Servers SHOULD conform to HTTP/1.1 Caching [[RFC7234](https://solidproject.org/TR/protocol#bib-rfc7234)]. 

#### 2.2 HTTP Client

Clients MUST conform to HTTP/1.1 Message Syntax and Routing [[RFC7230](https://solidproject.org/TR/protocol#bib-rfc7230)] and HTTP/1.1 Semantics and Content [[RFC7231](https://solidproject.org/TR/protocol#bib-rfc7231)]. 

Clients MAY conform to HTTP/1.1 Conditional Requests [[RFC7232](https://solidproject.org/TR/protocol#bib-rfc7232)]. Clients MAY conform to HTTP/1.1 Caching [[RFC7234](https://solidproject.org/TR/protocol#bib-rfc7234)]. 

### 3. Uniform Resource Identifier (URI)

Clients and servers SHOULD conform to the Uniform Resource Identifier (URI) and Internationalized Resource Identifier (IRI) specifications to ensure consistent identification and referencing of resources. The URI provides a simple and extensible means for identifying a resource, while the IRI extends the URI to allow the use of characters from the Universal Character Set (UCS) [[RFC3987](https://solidproject.org/TR/protocol#bib-rfc3987)]. This adherence promotes interoperability and a consistent experience across the Solid-Lite ecosystem.

### 4. Resources (WIP)
- Resource Containment: How resources are contained within the Solid-Lite ecosystem.
- Auxiliary Resources: Supporting resources that augment or describe primary resources.

### 5. Reading and Writing Resources (WIP)
- Resource Type Heuristics: Criteria for determining resource types.
- Reading Resources: Methods and guidelines for reading data from resources.
- Writing Resources: How to write or update data to a resource.
- Deleting Resources: Guidelines for removing resources.
- Resource Representations: How resources can be represented, especially in JSON format.

### 6. Cross-Origin Resource Sharing (CORS)

Solid applications seamlessly integrate data from disparate sources. However, web browsers, by default, adhere to the Same-Origin Policy, restricting requests to different domains for security reasons. This precaution, vital for preventing malicious data retrieval, can inadvertently restrict legitimate Solid applications.

Consider an application at `https://app.example/` aiming to fetch data from `https://sourceA.example/` and `https://sourceB.example/`. If Source A and Source B have granted the necessary permissions, the browser's inherent protections still inhibit this integration.

In Solid environments, where robust access control mechanisms are innate, browser-imposed restrictions may be redundant. The objective is to empower data owners to specify their resource access permissions.

To address this, the Cross-Origin Resource Sharing (CORS) [FETCH] mechanism comes into play. CORS permits servers to indicate accessible resources via specific HTTP headers. For Solid, the goal is to facilitate unrestricted CORS interactions, allowing the underlying Authorization layer to manage access control. The ensuing section provides directives for the requisite HTTP header configuration.

### 7. Identity
- WebID: An WebID is a URI that denotes an Agent.  When dereferencing a WebID, it should return machine readable data, which can be used to discover other data, by following your nose (FYN).  See Primer for examples.

### 8. Authentication (WIP)
- WebID-XX: Method to authenticate using TLS with a WebID.

### 9. Authorization
- Auth Lite: The default authorization policy is that everyone can read, only the owner can write.  If access is not granted HTTP 401 (I dont know who you are) or HTTP 403 (I know who you are but you do not have access) should be returned.

### 10. Live Update
- Live Updates are not currently required, and may be implemented using using a [SLIP](https://github.com/solid-lite/slips)

## JSON Representation with Links

All resources should be represented in a clear and structured JSON format. JSON provides an easy-to-understand format that can be quickly parsed and read by both humans and machines.

Example of a Resource JSON:

```json
  {
    "@context": "http://example.org/context/v1",
    "@id": "http://example.org/album#1",
    "name": "Example Album",
    "releaseDate": "2023-01-01",
    "tracks":
    [
      {
        "@id": "http://example.org/track#1",
        "@type": "Track",
        "name": "Track 1",
        "duration": "3:45"
      },
      {
        "@id": "http://example.org/track#2",
        "@type": "Track",
        "name": "Track 2",
        "duration": "4:32"
      }
    ],
    "artist": {
      "@id": "http://example.org/artist#1",
      "@type": "Artist",
      "name": "Example Artist",
      "birthDate": "1990-01-01"
    }
  }
```

In this example:
- @id provides a unique ID for the resource.
- @type indicates the type of resource.
- other fields describe the data in JSON-LD

Using JSON with links allows for a clear structure while also providing a way to navigate between related resources in the Solid-Lite ecosystem.
