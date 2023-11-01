![image](https://github.com/solid-lite/draft-spec/assets/65864/d9b22bad-de6c-4f8a-97ec-827b1caafa56)


## Solid-Lite Protocol Overview

### 1. Introduction
- Terminology: Define key terms related to Solid-Lite.
- Namespaces: List of namespaces used in Solid-Lite.
- Conformance: Specifications that must be adhered to

### 2. Hypertext Transfer Protocol (HTTP)

#### 2.1 HTTP Server

Servers MUST conform to HTTP/1.1 Message Syntax and Routing [RFC7230] and HTTP/1.1 Semantics and Content [RFC7231].

Servers MUST conform to HTTP/1.1 Conditional Requests [RFC7232]. Servers SHOULD conform to HTTP/1.1 Caching [RFC7234].

#### 2.2 HTTP Client

- HTTP Client: Expected behavior and operations from the client side.

### 3. Uniform Resource Identifier (URI)
- URI Slash Semantics: Define how slashes (/) in URIs should be interpreted.
- URI Persistence: Guidelines on how URIs should remain consistent over time.

### 4. Resources
- Resource Containment: How resources are contained within the Solid-Lite ecosystem.
- Auxiliary Resources: Supporting resources that augment or describe primary resources.

### 5. Reading and Writing Resources
- Resource Type Heuristics: Criteria for determining resource types.
- Reading Resources: Methods and guidelines for reading data from resources.
- Writing Resources: How to write or update data to a resource.
- Deleting Resources: Guidelines for removing resources.
- Resource Representations: How resources can be represented, especially in JSON format.

### 7. Live Update
- TBD maybe optional

### 8. Cross-Origin Resource Sharing (CORS)
- CORS Server: Specification for the server supporting cross-origin requests.

### 9. Identity
- WebID: An identifier scheme using URIs, describing how to set up and use WebIDs.

### 10. Authentication
- WebID-XX: Method to authenticate using TLS with a WebID.

### 11. Authorization
- Auth Lite: Everyone can read, owner can write

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
