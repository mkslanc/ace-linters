"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[987],{

/***/ 12764:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var Range = (__webpack_require__(59082)/* .Range */ .e);
var BaseFoldMode = (__webpack_require__(15369).FoldMode);

var FoldMode = exports.Z = function(commentRegex) {
    if (commentRegex) {
        this.foldingStartMarker = new RegExp(
            this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
        );
        this.foldingStopMarker = new RegExp(
            this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
        );
    }
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {
    
    this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;
    this.singleLineBlockCommentRe= /^\s*(\/\*).*\*\/\s*$/;
    this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
    this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/;
    
    //prevent naming conflict with any modes that inherit from cstyle and override this (like csharp)
    this._getFoldWidgetBase = this.getFoldWidget;
    
    /**
     * Gets fold widget with some non-standard extras:
     *
     * @example lineCommentRegionStart
     *      //#region [optional description]
     *
     * @example blockCommentRegionStart
     *      /*#region [optional description] *[/]
     *
     * @example tripleStarFoldingSection
     *      /*** this folds even though 1 line because it has 3 stars ***[/]
     * 
     * @note the pound symbol for region tags is optional
     */
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
    
        if (this.singleLineBlockCommentRe.test(line)) {
            // No widget for single line block comment unless region or triple star
            if (!this.startRegionRe.test(line) && !this.tripleStarBlockCommentRe.test(line))
                return "";
        }
    
        var fw = this._getFoldWidgetBase(session, foldStyle, row);
    
        if (!fw && this.startRegionRe.test(line))
            return "start"; // lineCommentRegionStart
    
        return fw;
    };

    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
        var line = session.getLine(row);
        
        if (this.startRegionRe.test(line))
            return this.getCommentRegionBlock(session, line, row);
        
        var match = line.match(this.foldingStartMarker);
        if (match) {
            var i = match.index;

            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i);
                
            var range = session.getCommentFoldRange(row, i + match[0].length, 1);
            
            if (range && !range.isMultiLine()) {
                if (forceMultiline) {
                    range = this.getSectionRange(session, row);
                } else if (foldStyle != "all")
                    range = null;
            }
            
            return range;
        }

        if (foldStyle === "markbegin")
            return;

        var match = line.match(this.foldingStopMarker);
        if (match) {
            var i = match.index + match[0].length;

            if (match[1])
                return this.closingBracketBlock(session, match[1], row, i);

            return session.getCommentFoldRange(row, i, -1);
        }
    };
    
    this.getSectionRange = function(session, row) {
        var line = session.getLine(row);
        var startIndent = line.search(/\S/);
        var startRow = row;
        var startColumn = line.length;
        row = row + 1;
        var endRow = row;
        var maxRow = session.getLength();
        while (++row < maxRow) {
            line = session.getLine(row);
            var indent = line.search(/\S/);
            if (indent === -1)
                continue;
            if  (startIndent > indent)
                break;
            var subRange = this.getFoldWidgetRange(session, "all", row);
            
            if (subRange) {
                if (subRange.start.row <= startRow) {
                    break;
                } else if (subRange.isMultiLine()) {
                    row = subRange.end.row;
                } else if (startIndent == indent) {
                    break;
                }
            }
            endRow = row;
        }
        
        return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
    };
    
    /**
     * gets comment region block with end region assumed to be start of comment in any cstyle mode or SQL mode (--) which inherits from this.
     * There may optionally be a pound symbol before the region/endregion statement
     */
    this.getCommentRegionBlock = function(session, line, row) {
        var startColumn = line.search(/\s*$/);
        var maxRow = session.getLength();
        var startRow = row;
        
        var re = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;
        var depth = 1;
        while (++row < maxRow) {
            line = session.getLine(row);
            var m = re.exec(line);
            if (!m) continue;
            if (m[1]) depth--;
            else depth++;

            if (!depth) break;
        }

        var endRow = row;
        if (endRow > startRow) {
            return new Range(startRow, startColumn, endRow, line.length);
        }
    };

}).call(FoldMode.prototype);


/***/ }),

/***/ 80987:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/

    

    var oop = __webpack_require__(89359);
    var TextMode = (__webpack_require__(98030).Mode);
    var QmlHighlightRules = (__webpack_require__(91635)/* .QmlHighlightRules */ .H);
    var FoldMode = (__webpack_require__(12764)/* .FoldMode */ .Z);

    var Mode = function() {
        this.HighlightRules = QmlHighlightRules;
        this.foldingRules = new FoldMode();
        this.$behaviour = this.$defaultBehaviour;
    };
    oop.inherits(Mode, TextMode);

    (function() {
        this.lineCommentStart = "//";
        this.blockComment = {start: "/*", end: "*/"};
        this.$quotes = { '"': '"', "'": "'" };
        this.$id = "ace/mode/qml";
    }).call(Mode.prototype);

    exports.Mode = Mode;


/***/ }),

/***/ 91635:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



    var oop = __webpack_require__(89359);
    var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

    var QmlHighlightRules = function() {
        // see: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects
        var keywordMapper = this.createKeywordMapper({
            "variable.language":
                "Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|"  + // Constructors
                "Namespace|QName|XML|XMLList|"                                             + // E4X
                "ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|"   +
                "Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|"                    +
                "Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|"   + // Errors
                "SyntaxError|TypeError|URIError|"                                          +
                "decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|" + // Non-constructor functions
                "isNaN|parseFloat|parseInt|"                                               +
                "JSON|Math|"                                                               + // Other
                "this|arguments|prototype|window|document"                                 , // Pseudo
            "keyword":
                "const|yield|import|get|set|async|await|" +
                "break|case|catch|continue|default|delete|do|else|finally|for|function|" +
                "if|in|of|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|" +
                // invalid or reserved
                "__parent__|__count__|escape|unescape|with|__proto__|" +
                "class|enum|extends|super|export|implements|private|public|interface|package|protected|static|" +
                // qml
                "readonly|string|int|bool|date|color|url|real|double|var|variant|" +
                "height|width|anchors|parent|" +
                "Abstract3DSeries|AbstractActionInput|AbstractAnimation|AbstractAxis|AbstractAxis3D|AbstractAxisInput|" +
                "AbstractBarSeries|AbstractButton|AbstractClipAnimator|AbstractClipBlendNode|AbstractDataProxy|AbstractGraph3D|" +
                "AbstractInputHandler3D|AbstractPhysicalDevice|AbstractRayCaster|AbstractSeries|AbstractSkeleton|AbstractTextureImage|" +
                "Accelerometer|AccelerometerReading|Accessible|Action|ActionGroup|ActionInput|" +
                "AdditiveClipBlend|Address|Affector|Age|AlphaCoverage|AlphaTest|" +
                "Altimeter|AltimeterReading|AmbientLightReading|AmbientLightSensor|AmbientTemperatureReading|AmbientTemperatureSensor|" +
                "AnalogAxisInput|AnchorAnimation|AnchorChanges|AngleDirection|AnimatedImage|AnimatedSprite|" +
                "Animation|AnimationController|AnimationGroup|Animator|ApplicationWindow|ApplicationWindowStyle|" +
                "AreaSeries|Armature|AttenuationModelInverse|AttenuationModelLinear|Attractor|Attribute|" +
                "Audio|AudioCategory|AudioEngine|AudioListener|AudioSample|AuthenticationDialogRequest|" +
                "Axis|AxisAccumulator|AxisSetting|BackspaceKey|Bar3DSeries|BarCategoryAxis|" +
                "BarDataProxy|BarSeries|BarSet|Bars3D|BaseKey|Behavior|" +
                "Binding|Blend|BlendEquation|BlendEquationArguments|BlendedClipAnimator|BlitFramebuffer|" +
                "BluetoothDiscoveryModel|BluetoothService|BluetoothSocket|BorderImage|BorderImageMesh|BoxPlotSeries|" +
                "BoxSet|BrightnessContrast|Buffer|BusyIndicator|BusyIndicatorStyle|Button|" +
                "ButtonAxisInput|ButtonGroup|ButtonStyle|Calendar|CalendarStyle|Camera|" +
                "Camera3D|CameraCapabilities|CameraCapture|CameraExposure|CameraFlash|CameraFocus|" +
                "CameraImageProcessing|CameraLens|CameraRecorder|CameraSelector|CandlestickSeries|CandlestickSet|" +
                "Canvas|Canvas3D|Canvas3DAbstractObject|Canvas3DActiveInfo|Canvas3DBuffer|Canvas3DContextAttributes|" +
                "Canvas3DFrameBuffer|Canvas3DProgram|Canvas3DRenderBuffer|Canvas3DShader|Canvas3DShaderPrecisionFormat|Canvas3DTexture|" +
                "Canvas3DTextureProvider|Canvas3DUniformLocation|CanvasGradient|CanvasImageData|CanvasPixelArray|Category|" +
                "CategoryAxis|CategoryAxis3D|CategoryModel|CategoryRange|ChangeLanguageKey|ChartView|" +
                "CheckBox|CheckBoxStyle|CheckDelegate|CircularGauge|CircularGaugeStyle|ClearBuffers|" +
                "ClipAnimator|ClipPlane|CloseEvent|ColorAnimation|ColorDialog|ColorDialogRequest|" +
                "ColorGradient|ColorGradientStop|ColorMask|ColorOverlay|Colorize|Column|" +
                "ColumnLayout|ComboBox|ComboBoxStyle|Compass|CompassReading|Component|Component3D|" +
                "ComputeCommand|ConeGeometry|ConeMesh|ConicalGradient|Connections|ContactDetail|" +
                "ContactDetails|Container|Context2D|Context3D|ContextMenuRequest|Control|" +
                "CoordinateAnimation|CuboidGeometry|CuboidMesh|CullFace|CumulativeDirection|" +
                "Custom3DItem|Custom3DLabel|Custom3DVolume|CustomParticle|CylinderGeometry|CylinderMesh|" +
                "Date|DateTimeAxis|DelayButton|DelayButtonStyle|DelegateChoice|DelegateChooser|DelegateModel|" +
                "DelegateModelGroup|DepthTest|Desaturate|Dial|DialStyle|Dialog|DialogButtonBox|DiffuseMapMaterial|" +
                "DiffuseSpecularMapMaterial|DiffuseSpecularMaterial|Direction|DirectionalBlur|DirectionalLight|DispatchCompute|" +
                "Displace|DistanceReading|DistanceSensor|Dithering|DoubleValidator|Drag|DragEvent|DragHandler|Drawer|DropArea|" +
                "DropShadow|DwmFeatures|DynamicParameter|EditorialModel|Effect|EllipseShape|Emitter|EnterKey|EnterKeyAction|" +
                "Entity|EntityLoader|EnvironmentLight|EventConnection|EventPoint|EventTouchPoint|ExclusiveGroup|ExtendedAttributes|" +
                "ExtrudedTextGeometry|ExtrudedTextMesh|FastBlur|FileDialog|FileDialogRequest|FillerKey|FilterKey|FinalState|" +
                "FirstPersonCameraController|Flickable|Flipable|Flow|FocusScope|FolderListModel|FontDialog|FontLoader|" +
                "FontMetrics|FormValidationMessageRequest|ForwardRenderer|Frame|FrameAction|FrameGraphNode|Friction|" +
                "FrontFace|FrustumCulling|FullScreenRequest|GLStateDumpExt|GammaAdjust|Gauge|GaugeStyle|GaussianBlur|" +
                "GeocodeModel|Geometry|GeometryRenderer|GestureEvent|Glow|GoochMaterial|Gradient|GradientStop|GraphicsApiFilter|" +
                "GraphicsInfo|Gravity|Grid|GridLayout|GridMesh|GridView|GroupBox|GroupGoal|Gyroscope|GyroscopeReading|HBarModelMapper|" +
                "HBoxPlotModelMapper|HCandlestickModelMapper|HPieModelMapper|HXYModelMapper|HandlerPoint|HandwritingInputPanel|" +
                "HandwritingModeKey|HeightMapSurfaceDataProxy|HideKeyboardKey|HistoryState|HolsterReading|HolsterSensor|HorizontalBarSeries|" +
                "|HorizontalPercentBarSeries|HorizontalStackedBarSeries|HoverHandler|HueSaturation|HumidityReading|HumiditySensor|" +
                "IRProximityReading|IRProximitySensor|Icon|Image|ImageModel|ImageParticle|InnerShadow|InputChord|InputContext|InputEngine|" +
                "InputHandler3D|InputMethod|InputModeKey|InputPanel|InputSequence|InputSettings|Instantiator|IntValidator|InvokedServices|" +
                "Item|ItemDelegate|ItemGrabResult|ItemModelBarDataProxy|ItemModelScatterDataProxy|ItemModelSurfaceDataProxy|ItemParticle|" +
                "ItemSelectionModel|IviApplication|IviSurface|JavaScriptDialogRequest|Joint|JumpList|JumpListCategory|JumpListDestination|" +
                "JumpListLink|JumpListSeparator|Key|KeyEvent|KeyIcon|KeyNavigation|KeyPanel|KeyboardColumn|KeyboardDevice|KeyboardHandler|" +
                "KeyboardLayout|KeyboardLayoutLoader|KeyboardRow|KeyboardStyle|KeyframeAnimation|Keys|Label|Layer|LayerFilter|Layout|" +
                "LayoutMirroring|Legend|LerpBlend|LevelAdjust|LevelOfDetail|LevelOfDetailBoundingSphere|LevelOfDetailLoader|" +
                "LevelOfDetailSwitch|LidReading|LidSensor|Light|Light3D|LightReading|LightSensor|LineSeries|LineShape|LineWidth|" +
                "LinearGradient|ListElement|ListModel|ListView|Loader|Locale|Location|LogValueAxis|LogValueAxis3DFormatter|LoggingCategory|" +
                "LogicalDevice|Magnetometer|MagnetometerReading|Map|MapCircle|MapCircleObject|MapCopyrightNotice|MapGestureArea|MapIconObject|" +
                "MapItemGroup|MapItemView|MapObjectView|MapParameter|MapPinchEvent|MapPolygon|MapPolygonObject|MapPolyline|MapPolylineObject|" +
                "MapQuickItem|MapRectangle|MapRoute|MapRouteObject|MapType|Margins|MaskShape|MaskedBlur|Material|Matrix4x4|MediaPlayer|" +
                "MemoryBarrier|Menu|MenuBar|MenuBarItem|MenuBarStyle|MenuItem|MenuSeparator|MenuStyle|Mesh|MessageDialog|ModeKey|MorphTarget|" +
                "MorphingAnimation|MouseArea|MouseDevice|MouseEvent|MouseHandler|MultiPointHandler|MultiPointTouchArea|MultiSampleAntiAliasing|" +
                "Navigator|NdefFilter|NdefMimeRecord|NdefRecord|NdefTextRecord|NdefUriRecord|NearField|NoDepthMask|NoDraw|Node|NodeInstantiator|" +
                "NormalDiffuseMapAlphaMaterial|NormalDiffuseMapMaterial|NormalDiffuseSpecularMapMaterial|Number|NumberAnimation|NumberKey|Object3D|" +
                "ObjectModel|ObjectPicker|OpacityAnimator|OpacityMask|OpenGLInfo|OrbitCameraController|OrientationReading|OrientationSensor|Overlay|" +
                "Package|Page|PageIndicator|Pane|ParallelAnimation|Parameter|ParentAnimation|ParentChange|Particle|ParticleGroup|ParticlePainter|" +
                "ParticleSystem|Path|PathAngleArc|PathAnimation|PathArc|PathAttribute|PathCubic|PathCurve|PathElement|PathInterpolator|PathLine|" +
                "PathMove|PathPercent|PathQuad|PathSvg|PathView|PauseAnimation|PerVertexColorMaterial|PercentBarSeries|PhongAlphaMaterial|" +
                "PhongMaterial|PickEvent|PickLineEvent|PickPointEvent|PickTriangleEvent|PickingSettings|Picture|PieMenu|PieMenuStyle|PieSeries|" +
                "PieSlice|PinchArea|PinchEvent|PinchHandler|Place|PlaceAttribute|PlaceSearchModel|PlaceSearchSuggestionModel|PlaneGeometry|" +
                "PlaneMesh|PlayVariation|Playlist|PlaylistItem|Plugin|PluginParameter|PointDirection|PointHandler|PointLight|PointSize|" +
                "PointerDevice|PointerDeviceHandler|PointerEvent|PointerHandler|PolarChartView|PolygonOffset|Popup|Position|PositionSource|" +
                "Positioner|PressureReading|PressureSensor|Product|ProgressBar|ProgressBarStyle|PropertyAction|PropertyAnimation|PropertyChanges|" +
                "ProximityFilter|ProximityReading|ProximitySensor|QAbstractState|QAbstractTransition|QSignalTransition|" +
                "QVirtualKeyboardSelectionListModel|Qt|QtMultimedia|QtObject|QtPositioning|QuaternionAnimation|QuotaRequest|RadialBlur|" +
                "RadialGradient|Radio|RadioButton|RadioButtonStyle|RadioData|RadioDelegate|RangeSlider|Ratings|RayCaster|Rectangle|" +
                "RectangleShape|RectangularGlow|RecursiveBlur|RegExpValidator|RegisterProtocolHandlerRequest|RenderCapture|" +
                "RenderCaptureReply|RenderPass|RenderPassFilter|RenderSettings|RenderState|RenderStateSet|RenderSurfaceSelector|" +
                "RenderTarget|RenderTargetOutput|RenderTargetSelector|Repeater|ReviewModel|Rotation|RotationAnimation|RotationAnimator|" +
                "RotationReading|RotationSensor|RoundButton|Route|RouteLeg|RouteManeuver|RouteModel|RouteQuery|RouteSegment|Row|" +
                "RowLayout|Scale|ScaleAnimator|Scatter3D|Scatter3DSeries|ScatterDataProxy|ScatterSeries|Scene2D|Scene3D|SceneLoader|" +
                "ScissorTest|Screen|ScreenRayCaster|ScriptAction|ScrollBar|ScrollIndicator|ScrollView|ScrollViewStyle|ScxmlStateMachine|" +
                "SeamlessCubemap|SelectionListItem|Sensor|SensorGesture|SensorGlobal|SensorReading|SequentialAnimation|Settings|" +
                "SettingsStore|ShaderEffect|ShaderEffectSource|ShaderProgram|ShaderProgramBuilder|Shape|ShellSurface|ShellSurfaceItem|" +
                "ShiftHandler|ShiftKey|Shortcut|SignalSpy|SignalTransition|SinglePointHandler|Skeleton|SkeletonLoader|Slider|SliderStyle|" +
                "SmoothedAnimation|SortPolicy|Sound|SoundEffect|SoundInstance|SpaceKey|SphereGeometry|SphereMesh|SpinBox|SpinBoxStyle|" +
                "SplineSeries|SplitView|SpotLight|SpringAnimation|Sprite|SpriteGoal|SpriteSequence|Stack|StackLayout|StackView|" +
                "StackViewDelegate|StackedBarSeries|State|StateChangeScript|StateGroup|StateMachine|StateMachineLoader|StatusBar|" +
                "StatusBarStyle|StatusIndicator|StatusIndicatorStyle|StencilMask|StencilOperation|StencilOperationArguments|StencilTest|" +
                "StencilTestArguments|Store|String|Supplier|Surface3D|Surface3DSeries|SurfaceDataProxy|SwipeDelegate|SwipeView|Switch|" +
                "SwitchDelegate|SwitchStyle|SymbolModeKey|SystemPalette|Tab|TabBar|TabButton|TabView|TabViewStyle|TableView|TableViewColumn|" +
                "TableViewStyle|TapHandler|TapReading|TapSensor|TargetDirection|TaskbarButton|Technique|TechniqueFilter|TestCase|Text|TextArea|" +
                "TextAreaStyle|TextEdit|TextField|TextFieldStyle|TextInput|TextMetrics|TextureImage|TextureImageFactory|Theme3D|ThemeColor|" +
                "ThresholdMask|ThumbnailToolBar|ThumbnailToolButton|TiltReading|TiltSensor|TimeoutTransition|Timer|ToggleButton|" +
                "ToggleButtonStyle|ToolBar|ToolBarStyle|ToolButton|ToolSeparator|ToolTip|Torch|TorusGeometry|TorusMesh|TouchEventSequence|" +
                "TouchInputHandler3D|TouchPoint|Trace|TraceCanvas|TraceInputArea|TraceInputKey|TraceInputKeyPanel|TrailEmitter|Transaction|" +
                "Transform|Transition|Translate|TreeView|TreeViewStyle|Tumbler|TumblerColumn|TumblerStyle|Turbulence|UniformAnimator|User|" +
                "VBarModelMapper|VBoxPlotModelMapper|VCandlestickModelMapper|VPieModelMapper|VXYModelMapper|ValueAxis|ValueAxis3D|" +
                "ValueAxis3DFormatter|Vector3dAnimation|VertexBlendAnimation|Video|VideoOutput|ViewTransition|Viewport|" +
                "VirtualKeyboardSettings|Wander|WavefrontMesh|WaylandClient|WaylandCompositor|WaylandHardwareLayer|" +
                "WaylandOutput|WaylandQuickItem|WaylandSeat|WaylandSurface|WaylandView|Waypoint|" +
                "WebChannel|WebEngine|WebEngineAction|WebEngineCertificateError|WebEngineDownloadItem|WebEngineHistory|" +
                "WebEngineHistoryListModel|WebEngineLoadRequest|WebEngineNavigationRequest|WebEngineNewViewRequest|WebEngineProfile|WebEngineScript|" +
                "WebEngineSettings|WebEngineView|WebSocket|WebSocketServer|WebView|WebViewLoadRequest|" +
                "WheelEvent|Window|WlShell|WlShellSurface|WorkerScript|XAnimator|" +
                "XYPoint|XYSeries|XdgDecorationManagerV1|XdgPopup|XdgPopupV5|XdgPopupV6|" +
                "XdgShell|XdgShellV5|XdgShellV6|XdgSurface|XdgSurfaceV5|XdgSurfaceV6|" +
                "XdgToplevel|XdgToplevelV6|XmlListModel|XmlRole|YAnimator|ZoomBlur",
            "storage.type":
                "const|let|var|function|" + // js
                "property|", // qml
            "constant.language":
                "null|Infinity|NaN|undefined",
            "support.function":
                "print|console\\.log",
            "constant.language.boolean": "true|false"
        }, "identifier");

        // regexp must not have capturing parentheses. Use (?:) instead.
        // regexps are ordered -> the first match is used
        this.$rules = {
            "start" : [
                {
                    token : "string", // single line
                    regex : '"',
                    next  : "string"
                }, {
                    token : "constant.numeric", // hex
                    regex : "0[xX][0-9a-fA-F]+\\b"
                }, {
                    token : "constant.numeric", // float
                    regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
                }, {
                    token : "constant.language.boolean",
                    regex : "(?:true|false)\\b"
                }, {
                    token : "text",
                    regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
                }, {
                    token : "comment",
                    regex : "\\/\\/.*$"
                }, {
                    token : "comment.start",
                    regex : "\\/\\*",
                    next  : "comment"
                }, {
                    token : "paren.lparen",
                    regex : "[[({]"
                }, {
                    token : "paren.rparen",
                    regex : "[\\])}]"
                }, {
                    token : "text",
                    regex : "\\s+"
                }, {
                    token : keywordMapper,
                    regex : "\\b\\w+\\b"
                }
            ],
            "string" : [
                {
                    token : "constant.language.escape",
                    regex : /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\\/bfnrt])/
                }, {
                    token : "string",
                    regex : '"|$',
                    next  : "start"
                }, {
                    defaultToken : "string"
                }
            ],
            "comment" : [
                {
                    token : "comment.end",
                    regex : "\\*\\/",
                    next  : "start"
                }, {
                    defaultToken: "comment"
                }
            ]
        };

    };

    oop.inherits(QmlHighlightRules, TextHighlightRules);

    exports.H = QmlHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjk4Ny5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsS0FBZTtBQUNqQyxZQUFZLDJDQUE0QjtBQUN4QyxtQkFBbUIscUNBQStCOztBQUVsRCxlQUFlLFNBQWdCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUMsVUFBVTtBQUM3QyxxQ0FBcUMsUUFBUTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7Ozs7QUM5SkQ7QUFDQTtBQUNBOztBQUVBLElBQWlCOztBQUVqQixjQUFjLG1CQUFPLENBQUMsS0FBWTtBQUNsQyxtQkFBbUIsaUNBQXNCO0FBQ3pDLDRCQUE0Qix1REFBa0Q7QUFDOUUsbUJBQW1CLDhDQUFvQzs7QUFFdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0IseUJBQXlCO0FBQ3pCO0FBQ0EsS0FBSzs7QUFFTCxJQUFJLFlBQVk7Ozs7Ozs7O0FDekJIOztBQUViLGNBQWMsbUJBQU8sQ0FBQyxLQUFZO0FBQ2xDLDZCQUE2Qix3REFBb0Q7O0FBRWpGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGlDQUFpQztBQUNqQyxpQkFBaUI7QUFDakI7QUFDQSxtQ0FBbUM7QUFDbkMsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsRUFBRSxjQUFjLEVBQUU7QUFDakUsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLElBQUksU0FBeUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvY3N0eWxlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvcW1sLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvcW1sX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKGNvbW1lbnRSZWdleCkge1xuICAgIGlmIChjb21tZW50UmVnZXgpIHtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5zdGFydClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguZW5kKVxuICAgICAgICApO1xuICAgIH1cbn07XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICBcbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC8oW1xce1xcW1xcKF0pW15cXH1cXF1cXCldKiR8XlxccyooXFwvXFwqKS87XG4gICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IC9eW15cXFtcXHtcXChdKihbXFx9XFxdXFwpXSl8XltcXHNcXCpdKihcXCpcXC8pLztcbiAgICB0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZT0gL15cXHMqKFxcL1xcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZSA9IC9eXFxzKihcXC9cXCpcXCpcXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy5zdGFydFJlZ2lvblJlID0gL15cXHMqKFxcL1xcKnxcXC9cXC8pIz9yZWdpb25cXGIvO1xuICAgIFxuICAgIC8vcHJldmVudCBuYW1pbmcgY29uZmxpY3Qgd2l0aCBhbnkgbW9kZXMgdGhhdCBpbmhlcml0IGZyb20gY3N0eWxlIGFuZCBvdmVycmlkZSB0aGlzIChsaWtlIGNzaGFycClcbiAgICB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldDtcbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXRzIGZvbGQgd2lkZ2V0IHdpdGggc29tZSBub24tc3RhbmRhcmQgZXh0cmFzOlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLy8jcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGJsb2NrQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvKiNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXSAqWy9dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSB0cmlwbGVTdGFyRm9sZGluZ1NlY3Rpb25cbiAgICAgKiAgICAgIC8qKiogdGhpcyBmb2xkcyBldmVuIHRob3VnaCAxIGxpbmUgYmVjYXVzZSBpdCBoYXMgMyBzdGFycyAqKipbL11cbiAgICAgKiBcbiAgICAgKiBAbm90ZSB0aGUgcG91bmQgc3ltYm9sIGZvciByZWdpb24gdGFncyBpcyBvcHRpb25hbFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAvLyBObyB3aWRnZXQgZm9yIHNpbmdsZSBsaW5lIGJsb2NrIGNvbW1lbnQgdW5sZXNzIHJlZ2lvbiBvciB0cmlwbGUgc3RhclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSAmJiAhdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB2YXIgZncgPSB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZShzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdyk7XG4gICAgXG4gICAgICAgIGlmICghZncgJiYgdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiOyAvLyBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgXG4gICAgICAgIHJldHVybiBmdztcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdywgZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayhzZXNzaW9uLCBsaW5lLCByb3cpO1xuICAgICAgICBcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdGFydE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5pbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpICsgbWF0Y2hbMF0ubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHJhbmdlICYmICFyYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gdGhpcy5nZXRTZWN0aW9uUmFuZ2Uoc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvbGRTdHlsZSAhPSBcImFsbFwiKVxuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb2xkU3R5bGUgPT09IFwibWFya2JlZ2luXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdG9wTWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2luZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGksIC0xKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5nZXRTZWN0aW9uUmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0SW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICByb3cgPSByb3cgKyAxO1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgaW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICAgICAgaWYgKGluZGVudCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAgKHN0YXJ0SW5kZW50ID4gaW5kZW50KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgdmFyIHN1YlJhbmdlID0gdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2Uoc2Vzc2lvbiwgXCJhbGxcIiwgcm93KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHN1YlJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlJhbmdlLnN0YXJ0LnJvdyA8PSBzdGFydFJvdykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN1YlJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gc3ViUmFuZ2UuZW5kLnJvdztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0SW5kZW50ID09IGluZGVudCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRSb3cgPSByb3c7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aCk7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBnZXRzIGNvbW1lbnQgcmVnaW9uIGJsb2NrIHdpdGggZW5kIHJlZ2lvbiBhc3N1bWVkIHRvIGJlIHN0YXJ0IG9mIGNvbW1lbnQgaW4gYW55IGNzdHlsZSBtb2RlIG9yIFNRTCBtb2RlICgtLSkgd2hpY2ggaW5oZXJpdHMgZnJvbSB0aGlzLlxuICAgICAqIFRoZXJlIG1heSBvcHRpb25hbGx5IGJlIGEgcG91bmQgc3ltYm9sIGJlZm9yZSB0aGUgcmVnaW9uL2VuZHJlZ2lvbiBzdGF0ZW1lbnRcbiAgICAgKi9cbiAgICB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIGxpbmUsIHJvdykge1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLnNlYXJjaCgvXFxzKiQvKTtcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgXG4gICAgICAgIHZhciByZSA9IC9eXFxzKig/OlxcL1xcKnxcXC9cXC98LS0pIz8oZW5kKT9yZWdpb25cXGIvO1xuICAgICAgICB2YXIgZGVwdGggPSAxO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBtID0gcmUuZXhlYyhsaW5lKTtcbiAgICAgICAgICAgIGlmICghbSkgY29udGludWU7XG4gICAgICAgICAgICBpZiAobVsxXSkgZGVwdGgtLTtcbiAgICAgICAgICAgIGVsc2UgZGVwdGgrKztcblxuICAgICAgICAgICAgaWYgKCFkZXB0aCkgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGxpbmUubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIi8qXG4gIFRISVMgRklMRSBXQVMgQVVUT0dFTkVSQVRFRCBCWSBtb2RlLnRtcGwuanNcbiovXG5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbiAgICB2YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG4gICAgdmFyIFFtbEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vcW1sX2hpZ2hsaWdodF9ydWxlc1wiKS5RbWxIaWdobGlnaHRSdWxlcztcbiAgICB2YXIgRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2NzdHlsZVwiKS5Gb2xkTW9kZTtcblxuICAgIHZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBRbWxIaWdobGlnaHRSdWxlcztcbiAgICAgICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgRm9sZE1vZGUoKTtcbiAgICAgICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbiAgICB9O1xuICAgIG9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbiAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiLy9cIjtcbiAgICAgICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7c3RhcnQ6IFwiLypcIiwgZW5kOiBcIiovXCJ9O1xuICAgICAgICB0aGlzLiRxdW90ZXMgPSB7ICdcIic6ICdcIicsIFwiJ1wiOiBcIidcIiB9O1xuICAgICAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvcW1sXCI7XG4gICAgfSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbiAgICBleHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG4gICAgdmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxuICAgIHZhciBRbWxIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBzZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzXG4gICAgICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgICAgIFwidmFyaWFibGUubGFuZ3VhZ2VcIjpcbiAgICAgICAgICAgICAgICBcIkFycmF5fEJvb2xlYW58RGF0ZXxGdW5jdGlvbnxJdGVyYXRvcnxOdW1iZXJ8T2JqZWN0fFJlZ0V4cHxTdHJpbmd8UHJveHl8XCIgICsgLy8gQ29uc3RydWN0b3JzXG4gICAgICAgICAgICAgICAgXCJOYW1lc3BhY2V8UU5hbWV8WE1MfFhNTExpc3R8XCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIC8vIEU0WFxuICAgICAgICAgICAgICAgIFwiQXJyYXlCdWZmZXJ8RmxvYXQzMkFycmF5fEZsb2F0NjRBcnJheXxJbnQxNkFycmF5fEludDMyQXJyYXl8SW50OEFycmF5fFwiICAgK1xuICAgICAgICAgICAgICAgIFwiVWludDE2QXJyYXl8VWludDMyQXJyYXl8VWludDhBcnJheXxVaW50OENsYW1wZWRBcnJheXxcIiAgICAgICAgICAgICAgICAgICAgK1xuICAgICAgICAgICAgICAgIFwiRXJyb3J8RXZhbEVycm9yfEludGVybmFsRXJyb3J8UmFuZ2VFcnJvcnxSZWZlcmVuY2VFcnJvcnxTdG9wSXRlcmF0aW9ufFwiICAgKyAvLyBFcnJvcnNcbiAgICAgICAgICAgICAgICBcIlN5bnRheEVycm9yfFR5cGVFcnJvcnxVUklFcnJvcnxcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICtcbiAgICAgICAgICAgICAgICBcImRlY29kZVVSSXxkZWNvZGVVUklDb21wb25lbnR8ZW5jb2RlVVJJfGVuY29kZVVSSUNvbXBvbmVudHxldmFsfGlzRmluaXRlfFwiICsgLy8gTm9uLWNvbnN0cnVjdG9yIGZ1bmN0aW9uc1xuICAgICAgICAgICAgICAgIFwiaXNOYU58cGFyc2VGbG9hdHxwYXJzZUludHxcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgK1xuICAgICAgICAgICAgICAgIFwiSlNPTnxNYXRofFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyAvLyBPdGhlclxuICAgICAgICAgICAgICAgIFwidGhpc3xhcmd1bWVudHN8cHJvdG90eXBlfHdpbmRvd3xkb2N1bWVudFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCAvLyBQc2V1ZG9cbiAgICAgICAgICAgIFwia2V5d29yZFwiOlxuICAgICAgICAgICAgICAgIFwiY29uc3R8eWllbGR8aW1wb3J0fGdldHxzZXR8YXN5bmN8YXdhaXR8XCIgK1xuICAgICAgICAgICAgICAgIFwiYnJlYWt8Y2FzZXxjYXRjaHxjb250aW51ZXxkZWZhdWx0fGRlbGV0ZXxkb3xlbHNlfGZpbmFsbHl8Zm9yfGZ1bmN0aW9ufFwiICtcbiAgICAgICAgICAgICAgICBcImlmfGlufG9mfGluc3RhbmNlb2Z8bmV3fHJldHVybnxzd2l0Y2h8dGhyb3d8dHJ5fHR5cGVvZnxsZXR8dmFyfHdoaWxlfHdpdGh8ZGVidWdnZXJ8XCIgK1xuICAgICAgICAgICAgICAgIC8vIGludmFsaWQgb3IgcmVzZXJ2ZWRcbiAgICAgICAgICAgICAgICBcIl9fcGFyZW50X198X19jb3VudF9ffGVzY2FwZXx1bmVzY2FwZXx3aXRofF9fcHJvdG9fX3xcIiArXG4gICAgICAgICAgICAgICAgXCJjbGFzc3xlbnVtfGV4dGVuZHN8c3VwZXJ8ZXhwb3J0fGltcGxlbWVudHN8cHJpdmF0ZXxwdWJsaWN8aW50ZXJmYWNlfHBhY2thZ2V8cHJvdGVjdGVkfHN0YXRpY3xcIiArXG4gICAgICAgICAgICAgICAgLy8gcW1sXG4gICAgICAgICAgICAgICAgXCJyZWFkb25seXxzdHJpbmd8aW50fGJvb2x8ZGF0ZXxjb2xvcnx1cmx8cmVhbHxkb3VibGV8dmFyfHZhcmlhbnR8XCIgK1xuICAgICAgICAgICAgICAgIFwiaGVpZ2h0fHdpZHRofGFuY2hvcnN8cGFyZW50fFwiICtcbiAgICAgICAgICAgICAgICBcIkFic3RyYWN0M0RTZXJpZXN8QWJzdHJhY3RBY3Rpb25JbnB1dHxBYnN0cmFjdEFuaW1hdGlvbnxBYnN0cmFjdEF4aXN8QWJzdHJhY3RBeGlzM0R8QWJzdHJhY3RBeGlzSW5wdXR8XCIgK1xuICAgICAgICAgICAgICAgIFwiQWJzdHJhY3RCYXJTZXJpZXN8QWJzdHJhY3RCdXR0b258QWJzdHJhY3RDbGlwQW5pbWF0b3J8QWJzdHJhY3RDbGlwQmxlbmROb2RlfEFic3RyYWN0RGF0YVByb3h5fEFic3RyYWN0R3JhcGgzRHxcIiArXG4gICAgICAgICAgICAgICAgXCJBYnN0cmFjdElucHV0SGFuZGxlcjNEfEFic3RyYWN0UGh5c2ljYWxEZXZpY2V8QWJzdHJhY3RSYXlDYXN0ZXJ8QWJzdHJhY3RTZXJpZXN8QWJzdHJhY3RTa2VsZXRvbnxBYnN0cmFjdFRleHR1cmVJbWFnZXxcIiArXG4gICAgICAgICAgICAgICAgXCJBY2NlbGVyb21ldGVyfEFjY2VsZXJvbWV0ZXJSZWFkaW5nfEFjY2Vzc2libGV8QWN0aW9ufEFjdGlvbkdyb3VwfEFjdGlvbklucHV0fFwiICtcbiAgICAgICAgICAgICAgICBcIkFkZGl0aXZlQ2xpcEJsZW5kfEFkZHJlc3N8QWZmZWN0b3J8QWdlfEFscGhhQ292ZXJhZ2V8QWxwaGFUZXN0fFwiICtcbiAgICAgICAgICAgICAgICBcIkFsdGltZXRlcnxBbHRpbWV0ZXJSZWFkaW5nfEFtYmllbnRMaWdodFJlYWRpbmd8QW1iaWVudExpZ2h0U2Vuc29yfEFtYmllbnRUZW1wZXJhdHVyZVJlYWRpbmd8QW1iaWVudFRlbXBlcmF0dXJlU2Vuc29yfFwiICtcbiAgICAgICAgICAgICAgICBcIkFuYWxvZ0F4aXNJbnB1dHxBbmNob3JBbmltYXRpb258QW5jaG9yQ2hhbmdlc3xBbmdsZURpcmVjdGlvbnxBbmltYXRlZEltYWdlfEFuaW1hdGVkU3ByaXRlfFwiICtcbiAgICAgICAgICAgICAgICBcIkFuaW1hdGlvbnxBbmltYXRpb25Db250cm9sbGVyfEFuaW1hdGlvbkdyb3VwfEFuaW1hdG9yfEFwcGxpY2F0aW9uV2luZG93fEFwcGxpY2F0aW9uV2luZG93U3R5bGV8XCIgK1xuICAgICAgICAgICAgICAgIFwiQXJlYVNlcmllc3xBcm1hdHVyZXxBdHRlbnVhdGlvbk1vZGVsSW52ZXJzZXxBdHRlbnVhdGlvbk1vZGVsTGluZWFyfEF0dHJhY3RvcnxBdHRyaWJ1dGV8XCIgK1xuICAgICAgICAgICAgICAgIFwiQXVkaW98QXVkaW9DYXRlZ29yeXxBdWRpb0VuZ2luZXxBdWRpb0xpc3RlbmVyfEF1ZGlvU2FtcGxlfEF1dGhlbnRpY2F0aW9uRGlhbG9nUmVxdWVzdHxcIiArXG4gICAgICAgICAgICAgICAgXCJBeGlzfEF4aXNBY2N1bXVsYXRvcnxBeGlzU2V0dGluZ3xCYWNrc3BhY2VLZXl8QmFyM0RTZXJpZXN8QmFyQ2F0ZWdvcnlBeGlzfFwiICtcbiAgICAgICAgICAgICAgICBcIkJhckRhdGFQcm94eXxCYXJTZXJpZXN8QmFyU2V0fEJhcnMzRHxCYXNlS2V5fEJlaGF2aW9yfFwiICtcbiAgICAgICAgICAgICAgICBcIkJpbmRpbmd8QmxlbmR8QmxlbmRFcXVhdGlvbnxCbGVuZEVxdWF0aW9uQXJndW1lbnRzfEJsZW5kZWRDbGlwQW5pbWF0b3J8QmxpdEZyYW1lYnVmZmVyfFwiICtcbiAgICAgICAgICAgICAgICBcIkJsdWV0b290aERpc2NvdmVyeU1vZGVsfEJsdWV0b290aFNlcnZpY2V8Qmx1ZXRvb3RoU29ja2V0fEJvcmRlckltYWdlfEJvcmRlckltYWdlTWVzaHxCb3hQbG90U2VyaWVzfFwiICtcbiAgICAgICAgICAgICAgICBcIkJveFNldHxCcmlnaHRuZXNzQ29udHJhc3R8QnVmZmVyfEJ1c3lJbmRpY2F0b3J8QnVzeUluZGljYXRvclN0eWxlfEJ1dHRvbnxcIiArXG4gICAgICAgICAgICAgICAgXCJCdXR0b25BeGlzSW5wdXR8QnV0dG9uR3JvdXB8QnV0dG9uU3R5bGV8Q2FsZW5kYXJ8Q2FsZW5kYXJTdHlsZXxDYW1lcmF8XCIgK1xuICAgICAgICAgICAgICAgIFwiQ2FtZXJhM0R8Q2FtZXJhQ2FwYWJpbGl0aWVzfENhbWVyYUNhcHR1cmV8Q2FtZXJhRXhwb3N1cmV8Q2FtZXJhRmxhc2h8Q2FtZXJhRm9jdXN8XCIgK1xuICAgICAgICAgICAgICAgIFwiQ2FtZXJhSW1hZ2VQcm9jZXNzaW5nfENhbWVyYUxlbnN8Q2FtZXJhUmVjb3JkZXJ8Q2FtZXJhU2VsZWN0b3J8Q2FuZGxlc3RpY2tTZXJpZXN8Q2FuZGxlc3RpY2tTZXR8XCIgK1xuICAgICAgICAgICAgICAgIFwiQ2FudmFzfENhbnZhczNEfENhbnZhczNEQWJzdHJhY3RPYmplY3R8Q2FudmFzM0RBY3RpdmVJbmZvfENhbnZhczNEQnVmZmVyfENhbnZhczNEQ29udGV4dEF0dHJpYnV0ZXN8XCIgK1xuICAgICAgICAgICAgICAgIFwiQ2FudmFzM0RGcmFtZUJ1ZmZlcnxDYW52YXMzRFByb2dyYW18Q2FudmFzM0RSZW5kZXJCdWZmZXJ8Q2FudmFzM0RTaGFkZXJ8Q2FudmFzM0RTaGFkZXJQcmVjaXNpb25Gb3JtYXR8Q2FudmFzM0RUZXh0dXJlfFwiICtcbiAgICAgICAgICAgICAgICBcIkNhbnZhczNEVGV4dHVyZVByb3ZpZGVyfENhbnZhczNEVW5pZm9ybUxvY2F0aW9ufENhbnZhc0dyYWRpZW50fENhbnZhc0ltYWdlRGF0YXxDYW52YXNQaXhlbEFycmF5fENhdGVnb3J5fFwiICtcbiAgICAgICAgICAgICAgICBcIkNhdGVnb3J5QXhpc3xDYXRlZ29yeUF4aXMzRHxDYXRlZ29yeU1vZGVsfENhdGVnb3J5UmFuZ2V8Q2hhbmdlTGFuZ3VhZ2VLZXl8Q2hhcnRWaWV3fFwiICtcbiAgICAgICAgICAgICAgICBcIkNoZWNrQm94fENoZWNrQm94U3R5bGV8Q2hlY2tEZWxlZ2F0ZXxDaXJjdWxhckdhdWdlfENpcmN1bGFyR2F1Z2VTdHlsZXxDbGVhckJ1ZmZlcnN8XCIgK1xuICAgICAgICAgICAgICAgIFwiQ2xpcEFuaW1hdG9yfENsaXBQbGFuZXxDbG9zZUV2ZW50fENvbG9yQW5pbWF0aW9ufENvbG9yRGlhbG9nfENvbG9yRGlhbG9nUmVxdWVzdHxcIiArXG4gICAgICAgICAgICAgICAgXCJDb2xvckdyYWRpZW50fENvbG9yR3JhZGllbnRTdG9wfENvbG9yTWFza3xDb2xvck92ZXJsYXl8Q29sb3JpemV8Q29sdW1ufFwiICtcbiAgICAgICAgICAgICAgICBcIkNvbHVtbkxheW91dHxDb21ib0JveHxDb21ib0JveFN0eWxlfENvbXBhc3N8Q29tcGFzc1JlYWRpbmd8Q29tcG9uZW50fENvbXBvbmVudDNEfFwiICtcbiAgICAgICAgICAgICAgICBcIkNvbXB1dGVDb21tYW5kfENvbmVHZW9tZXRyeXxDb25lTWVzaHxDb25pY2FsR3JhZGllbnR8Q29ubmVjdGlvbnN8Q29udGFjdERldGFpbHxcIiArXG4gICAgICAgICAgICAgICAgXCJDb250YWN0RGV0YWlsc3xDb250YWluZXJ8Q29udGV4dDJEfENvbnRleHQzRHxDb250ZXh0TWVudVJlcXVlc3R8Q29udHJvbHxcIiArXG4gICAgICAgICAgICAgICAgXCJDb29yZGluYXRlQW5pbWF0aW9ufEN1Ym9pZEdlb21ldHJ5fEN1Ym9pZE1lc2h8Q3VsbEZhY2V8Q3VtdWxhdGl2ZURpcmVjdGlvbnxcIiArXG4gICAgICAgICAgICAgICAgXCJDdXN0b20zREl0ZW18Q3VzdG9tM0RMYWJlbHxDdXN0b20zRFZvbHVtZXxDdXN0b21QYXJ0aWNsZXxDeWxpbmRlckdlb21ldHJ5fEN5bGluZGVyTWVzaHxcIiArXG4gICAgICAgICAgICAgICAgXCJEYXRlfERhdGVUaW1lQXhpc3xEZWxheUJ1dHRvbnxEZWxheUJ1dHRvblN0eWxlfERlbGVnYXRlQ2hvaWNlfERlbGVnYXRlQ2hvb3NlcnxEZWxlZ2F0ZU1vZGVsfFwiICtcbiAgICAgICAgICAgICAgICBcIkRlbGVnYXRlTW9kZWxHcm91cHxEZXB0aFRlc3R8RGVzYXR1cmF0ZXxEaWFsfERpYWxTdHlsZXxEaWFsb2d8RGlhbG9nQnV0dG9uQm94fERpZmZ1c2VNYXBNYXRlcmlhbHxcIiArXG4gICAgICAgICAgICAgICAgXCJEaWZmdXNlU3BlY3VsYXJNYXBNYXRlcmlhbHxEaWZmdXNlU3BlY3VsYXJNYXRlcmlhbHxEaXJlY3Rpb258RGlyZWN0aW9uYWxCbHVyfERpcmVjdGlvbmFsTGlnaHR8RGlzcGF0Y2hDb21wdXRlfFwiICtcbiAgICAgICAgICAgICAgICBcIkRpc3BsYWNlfERpc3RhbmNlUmVhZGluZ3xEaXN0YW5jZVNlbnNvcnxEaXRoZXJpbmd8RG91YmxlVmFsaWRhdG9yfERyYWd8RHJhZ0V2ZW50fERyYWdIYW5kbGVyfERyYXdlcnxEcm9wQXJlYXxcIiArXG4gICAgICAgICAgICAgICAgXCJEcm9wU2hhZG93fER3bUZlYXR1cmVzfER5bmFtaWNQYXJhbWV0ZXJ8RWRpdG9yaWFsTW9kZWx8RWZmZWN0fEVsbGlwc2VTaGFwZXxFbWl0dGVyfEVudGVyS2V5fEVudGVyS2V5QWN0aW9ufFwiICtcbiAgICAgICAgICAgICAgICBcIkVudGl0eXxFbnRpdHlMb2FkZXJ8RW52aXJvbm1lbnRMaWdodHxFdmVudENvbm5lY3Rpb258RXZlbnRQb2ludHxFdmVudFRvdWNoUG9pbnR8RXhjbHVzaXZlR3JvdXB8RXh0ZW5kZWRBdHRyaWJ1dGVzfFwiICtcbiAgICAgICAgICAgICAgICBcIkV4dHJ1ZGVkVGV4dEdlb21ldHJ5fEV4dHJ1ZGVkVGV4dE1lc2h8RmFzdEJsdXJ8RmlsZURpYWxvZ3xGaWxlRGlhbG9nUmVxdWVzdHxGaWxsZXJLZXl8RmlsdGVyS2V5fEZpbmFsU3RhdGV8XCIgK1xuICAgICAgICAgICAgICAgIFwiRmlyc3RQZXJzb25DYW1lcmFDb250cm9sbGVyfEZsaWNrYWJsZXxGbGlwYWJsZXxGbG93fEZvY3VzU2NvcGV8Rm9sZGVyTGlzdE1vZGVsfEZvbnREaWFsb2d8Rm9udExvYWRlcnxcIiArXG4gICAgICAgICAgICAgICAgXCJGb250TWV0cmljc3xGb3JtVmFsaWRhdGlvbk1lc3NhZ2VSZXF1ZXN0fEZvcndhcmRSZW5kZXJlcnxGcmFtZXxGcmFtZUFjdGlvbnxGcmFtZUdyYXBoTm9kZXxGcmljdGlvbnxcIiArXG4gICAgICAgICAgICAgICAgXCJGcm9udEZhY2V8RnJ1c3R1bUN1bGxpbmd8RnVsbFNjcmVlblJlcXVlc3R8R0xTdGF0ZUR1bXBFeHR8R2FtbWFBZGp1c3R8R2F1Z2V8R2F1Z2VTdHlsZXxHYXVzc2lhbkJsdXJ8XCIgK1xuICAgICAgICAgICAgICAgIFwiR2VvY29kZU1vZGVsfEdlb21ldHJ5fEdlb21ldHJ5UmVuZGVyZXJ8R2VzdHVyZUV2ZW50fEdsb3d8R29vY2hNYXRlcmlhbHxHcmFkaWVudHxHcmFkaWVudFN0b3B8R3JhcGhpY3NBcGlGaWx0ZXJ8XCIgK1xuICAgICAgICAgICAgICAgIFwiR3JhcGhpY3NJbmZvfEdyYXZpdHl8R3JpZHxHcmlkTGF5b3V0fEdyaWRNZXNofEdyaWRWaWV3fEdyb3VwQm94fEdyb3VwR29hbHxHeXJvc2NvcGV8R3lyb3Njb3BlUmVhZGluZ3xIQmFyTW9kZWxNYXBwZXJ8XCIgK1xuICAgICAgICAgICAgICAgIFwiSEJveFBsb3RNb2RlbE1hcHBlcnxIQ2FuZGxlc3RpY2tNb2RlbE1hcHBlcnxIUGllTW9kZWxNYXBwZXJ8SFhZTW9kZWxNYXBwZXJ8SGFuZGxlclBvaW50fEhhbmR3cml0aW5nSW5wdXRQYW5lbHxcIiArXG4gICAgICAgICAgICAgICAgXCJIYW5kd3JpdGluZ01vZGVLZXl8SGVpZ2h0TWFwU3VyZmFjZURhdGFQcm94eXxIaWRlS2V5Ym9hcmRLZXl8SGlzdG9yeVN0YXRlfEhvbHN0ZXJSZWFkaW5nfEhvbHN0ZXJTZW5zb3J8SG9yaXpvbnRhbEJhclNlcmllc3xcIiArXG4gICAgICAgICAgICAgICAgXCJ8SG9yaXpvbnRhbFBlcmNlbnRCYXJTZXJpZXN8SG9yaXpvbnRhbFN0YWNrZWRCYXJTZXJpZXN8SG92ZXJIYW5kbGVyfEh1ZVNhdHVyYXRpb258SHVtaWRpdHlSZWFkaW5nfEh1bWlkaXR5U2Vuc29yfFwiICtcbiAgICAgICAgICAgICAgICBcIklSUHJveGltaXR5UmVhZGluZ3xJUlByb3hpbWl0eVNlbnNvcnxJY29ufEltYWdlfEltYWdlTW9kZWx8SW1hZ2VQYXJ0aWNsZXxJbm5lclNoYWRvd3xJbnB1dENob3JkfElucHV0Q29udGV4dHxJbnB1dEVuZ2luZXxcIiArXG4gICAgICAgICAgICAgICAgXCJJbnB1dEhhbmRsZXIzRHxJbnB1dE1ldGhvZHxJbnB1dE1vZGVLZXl8SW5wdXRQYW5lbHxJbnB1dFNlcXVlbmNlfElucHV0U2V0dGluZ3N8SW5zdGFudGlhdG9yfEludFZhbGlkYXRvcnxJbnZva2VkU2VydmljZXN8XCIgK1xuICAgICAgICAgICAgICAgIFwiSXRlbXxJdGVtRGVsZWdhdGV8SXRlbUdyYWJSZXN1bHR8SXRlbU1vZGVsQmFyRGF0YVByb3h5fEl0ZW1Nb2RlbFNjYXR0ZXJEYXRhUHJveHl8SXRlbU1vZGVsU3VyZmFjZURhdGFQcm94eXxJdGVtUGFydGljbGV8XCIgK1xuICAgICAgICAgICAgICAgIFwiSXRlbVNlbGVjdGlvbk1vZGVsfEl2aUFwcGxpY2F0aW9ufEl2aVN1cmZhY2V8SmF2YVNjcmlwdERpYWxvZ1JlcXVlc3R8Sm9pbnR8SnVtcExpc3R8SnVtcExpc3RDYXRlZ29yeXxKdW1wTGlzdERlc3RpbmF0aW9ufFwiICtcbiAgICAgICAgICAgICAgICBcIkp1bXBMaXN0TGlua3xKdW1wTGlzdFNlcGFyYXRvcnxLZXl8S2V5RXZlbnR8S2V5SWNvbnxLZXlOYXZpZ2F0aW9ufEtleVBhbmVsfEtleWJvYXJkQ29sdW1ufEtleWJvYXJkRGV2aWNlfEtleWJvYXJkSGFuZGxlcnxcIiArXG4gICAgICAgICAgICAgICAgXCJLZXlib2FyZExheW91dHxLZXlib2FyZExheW91dExvYWRlcnxLZXlib2FyZFJvd3xLZXlib2FyZFN0eWxlfEtleWZyYW1lQW5pbWF0aW9ufEtleXN8TGFiZWx8TGF5ZXJ8TGF5ZXJGaWx0ZXJ8TGF5b3V0fFwiICtcbiAgICAgICAgICAgICAgICBcIkxheW91dE1pcnJvcmluZ3xMZWdlbmR8TGVycEJsZW5kfExldmVsQWRqdXN0fExldmVsT2ZEZXRhaWx8TGV2ZWxPZkRldGFpbEJvdW5kaW5nU3BoZXJlfExldmVsT2ZEZXRhaWxMb2FkZXJ8XCIgK1xuICAgICAgICAgICAgICAgIFwiTGV2ZWxPZkRldGFpbFN3aXRjaHxMaWRSZWFkaW5nfExpZFNlbnNvcnxMaWdodHxMaWdodDNEfExpZ2h0UmVhZGluZ3xMaWdodFNlbnNvcnxMaW5lU2VyaWVzfExpbmVTaGFwZXxMaW5lV2lkdGh8XCIgK1xuICAgICAgICAgICAgICAgIFwiTGluZWFyR3JhZGllbnR8TGlzdEVsZW1lbnR8TGlzdE1vZGVsfExpc3RWaWV3fExvYWRlcnxMb2NhbGV8TG9jYXRpb258TG9nVmFsdWVBeGlzfExvZ1ZhbHVlQXhpczNERm9ybWF0dGVyfExvZ2dpbmdDYXRlZ29yeXxcIiArXG4gICAgICAgICAgICAgICAgXCJMb2dpY2FsRGV2aWNlfE1hZ25ldG9tZXRlcnxNYWduZXRvbWV0ZXJSZWFkaW5nfE1hcHxNYXBDaXJjbGV8TWFwQ2lyY2xlT2JqZWN0fE1hcENvcHlyaWdodE5vdGljZXxNYXBHZXN0dXJlQXJlYXxNYXBJY29uT2JqZWN0fFwiICtcbiAgICAgICAgICAgICAgICBcIk1hcEl0ZW1Hcm91cHxNYXBJdGVtVmlld3xNYXBPYmplY3RWaWV3fE1hcFBhcmFtZXRlcnxNYXBQaW5jaEV2ZW50fE1hcFBvbHlnb258TWFwUG9seWdvbk9iamVjdHxNYXBQb2x5bGluZXxNYXBQb2x5bGluZU9iamVjdHxcIiArXG4gICAgICAgICAgICAgICAgXCJNYXBRdWlja0l0ZW18TWFwUmVjdGFuZ2xlfE1hcFJvdXRlfE1hcFJvdXRlT2JqZWN0fE1hcFR5cGV8TWFyZ2luc3xNYXNrU2hhcGV8TWFza2VkQmx1cnxNYXRlcmlhbHxNYXRyaXg0eDR8TWVkaWFQbGF5ZXJ8XCIgK1xuICAgICAgICAgICAgICAgIFwiTWVtb3J5QmFycmllcnxNZW51fE1lbnVCYXJ8TWVudUJhckl0ZW18TWVudUJhclN0eWxlfE1lbnVJdGVtfE1lbnVTZXBhcmF0b3J8TWVudVN0eWxlfE1lc2h8TWVzc2FnZURpYWxvZ3xNb2RlS2V5fE1vcnBoVGFyZ2V0fFwiICtcbiAgICAgICAgICAgICAgICBcIk1vcnBoaW5nQW5pbWF0aW9ufE1vdXNlQXJlYXxNb3VzZURldmljZXxNb3VzZUV2ZW50fE1vdXNlSGFuZGxlcnxNdWx0aVBvaW50SGFuZGxlcnxNdWx0aVBvaW50VG91Y2hBcmVhfE11bHRpU2FtcGxlQW50aUFsaWFzaW5nfFwiICtcbiAgICAgICAgICAgICAgICBcIk5hdmlnYXRvcnxOZGVmRmlsdGVyfE5kZWZNaW1lUmVjb3JkfE5kZWZSZWNvcmR8TmRlZlRleHRSZWNvcmR8TmRlZlVyaVJlY29yZHxOZWFyRmllbGR8Tm9EZXB0aE1hc2t8Tm9EcmF3fE5vZGV8Tm9kZUluc3RhbnRpYXRvcnxcIiArXG4gICAgICAgICAgICAgICAgXCJOb3JtYWxEaWZmdXNlTWFwQWxwaGFNYXRlcmlhbHxOb3JtYWxEaWZmdXNlTWFwTWF0ZXJpYWx8Tm9ybWFsRGlmZnVzZVNwZWN1bGFyTWFwTWF0ZXJpYWx8TnVtYmVyfE51bWJlckFuaW1hdGlvbnxOdW1iZXJLZXl8T2JqZWN0M0R8XCIgK1xuICAgICAgICAgICAgICAgIFwiT2JqZWN0TW9kZWx8T2JqZWN0UGlja2VyfE9wYWNpdHlBbmltYXRvcnxPcGFjaXR5TWFza3xPcGVuR0xJbmZvfE9yYml0Q2FtZXJhQ29udHJvbGxlcnxPcmllbnRhdGlvblJlYWRpbmd8T3JpZW50YXRpb25TZW5zb3J8T3ZlcmxheXxcIiArXG4gICAgICAgICAgICAgICAgXCJQYWNrYWdlfFBhZ2V8UGFnZUluZGljYXRvcnxQYW5lfFBhcmFsbGVsQW5pbWF0aW9ufFBhcmFtZXRlcnxQYXJlbnRBbmltYXRpb258UGFyZW50Q2hhbmdlfFBhcnRpY2xlfFBhcnRpY2xlR3JvdXB8UGFydGljbGVQYWludGVyfFwiICtcbiAgICAgICAgICAgICAgICBcIlBhcnRpY2xlU3lzdGVtfFBhdGh8UGF0aEFuZ2xlQXJjfFBhdGhBbmltYXRpb258UGF0aEFyY3xQYXRoQXR0cmlidXRlfFBhdGhDdWJpY3xQYXRoQ3VydmV8UGF0aEVsZW1lbnR8UGF0aEludGVycG9sYXRvcnxQYXRoTGluZXxcIiArXG4gICAgICAgICAgICAgICAgXCJQYXRoTW92ZXxQYXRoUGVyY2VudHxQYXRoUXVhZHxQYXRoU3ZnfFBhdGhWaWV3fFBhdXNlQW5pbWF0aW9ufFBlclZlcnRleENvbG9yTWF0ZXJpYWx8UGVyY2VudEJhclNlcmllc3xQaG9uZ0FscGhhTWF0ZXJpYWx8XCIgK1xuICAgICAgICAgICAgICAgIFwiUGhvbmdNYXRlcmlhbHxQaWNrRXZlbnR8UGlja0xpbmVFdmVudHxQaWNrUG9pbnRFdmVudHxQaWNrVHJpYW5nbGVFdmVudHxQaWNraW5nU2V0dGluZ3N8UGljdHVyZXxQaWVNZW51fFBpZU1lbnVTdHlsZXxQaWVTZXJpZXN8XCIgK1xuICAgICAgICAgICAgICAgIFwiUGllU2xpY2V8UGluY2hBcmVhfFBpbmNoRXZlbnR8UGluY2hIYW5kbGVyfFBsYWNlfFBsYWNlQXR0cmlidXRlfFBsYWNlU2VhcmNoTW9kZWx8UGxhY2VTZWFyY2hTdWdnZXN0aW9uTW9kZWx8UGxhbmVHZW9tZXRyeXxcIiArXG4gICAgICAgICAgICAgICAgXCJQbGFuZU1lc2h8UGxheVZhcmlhdGlvbnxQbGF5bGlzdHxQbGF5bGlzdEl0ZW18UGx1Z2lufFBsdWdpblBhcmFtZXRlcnxQb2ludERpcmVjdGlvbnxQb2ludEhhbmRsZXJ8UG9pbnRMaWdodHxQb2ludFNpemV8XCIgK1xuICAgICAgICAgICAgICAgIFwiUG9pbnRlckRldmljZXxQb2ludGVyRGV2aWNlSGFuZGxlcnxQb2ludGVyRXZlbnR8UG9pbnRlckhhbmRsZXJ8UG9sYXJDaGFydFZpZXd8UG9seWdvbk9mZnNldHxQb3B1cHxQb3NpdGlvbnxQb3NpdGlvblNvdXJjZXxcIiArXG4gICAgICAgICAgICAgICAgXCJQb3NpdGlvbmVyfFByZXNzdXJlUmVhZGluZ3xQcmVzc3VyZVNlbnNvcnxQcm9kdWN0fFByb2dyZXNzQmFyfFByb2dyZXNzQmFyU3R5bGV8UHJvcGVydHlBY3Rpb258UHJvcGVydHlBbmltYXRpb258UHJvcGVydHlDaGFuZ2VzfFwiICtcbiAgICAgICAgICAgICAgICBcIlByb3hpbWl0eUZpbHRlcnxQcm94aW1pdHlSZWFkaW5nfFByb3hpbWl0eVNlbnNvcnxRQWJzdHJhY3RTdGF0ZXxRQWJzdHJhY3RUcmFuc2l0aW9ufFFTaWduYWxUcmFuc2l0aW9ufFwiICtcbiAgICAgICAgICAgICAgICBcIlFWaXJ0dWFsS2V5Ym9hcmRTZWxlY3Rpb25MaXN0TW9kZWx8UXR8UXRNdWx0aW1lZGlhfFF0T2JqZWN0fFF0UG9zaXRpb25pbmd8UXVhdGVybmlvbkFuaW1hdGlvbnxRdW90YVJlcXVlc3R8UmFkaWFsQmx1cnxcIiArXG4gICAgICAgICAgICAgICAgXCJSYWRpYWxHcmFkaWVudHxSYWRpb3xSYWRpb0J1dHRvbnxSYWRpb0J1dHRvblN0eWxlfFJhZGlvRGF0YXxSYWRpb0RlbGVnYXRlfFJhbmdlU2xpZGVyfFJhdGluZ3N8UmF5Q2FzdGVyfFJlY3RhbmdsZXxcIiArXG4gICAgICAgICAgICAgICAgXCJSZWN0YW5nbGVTaGFwZXxSZWN0YW5ndWxhckdsb3d8UmVjdXJzaXZlQmx1cnxSZWdFeHBWYWxpZGF0b3J8UmVnaXN0ZXJQcm90b2NvbEhhbmRsZXJSZXF1ZXN0fFJlbmRlckNhcHR1cmV8XCIgK1xuICAgICAgICAgICAgICAgIFwiUmVuZGVyQ2FwdHVyZVJlcGx5fFJlbmRlclBhc3N8UmVuZGVyUGFzc0ZpbHRlcnxSZW5kZXJTZXR0aW5nc3xSZW5kZXJTdGF0ZXxSZW5kZXJTdGF0ZVNldHxSZW5kZXJTdXJmYWNlU2VsZWN0b3J8XCIgK1xuICAgICAgICAgICAgICAgIFwiUmVuZGVyVGFyZ2V0fFJlbmRlclRhcmdldE91dHB1dHxSZW5kZXJUYXJnZXRTZWxlY3RvcnxSZXBlYXRlcnxSZXZpZXdNb2RlbHxSb3RhdGlvbnxSb3RhdGlvbkFuaW1hdGlvbnxSb3RhdGlvbkFuaW1hdG9yfFwiICtcbiAgICAgICAgICAgICAgICBcIlJvdGF0aW9uUmVhZGluZ3xSb3RhdGlvblNlbnNvcnxSb3VuZEJ1dHRvbnxSb3V0ZXxSb3V0ZUxlZ3xSb3V0ZU1hbmV1dmVyfFJvdXRlTW9kZWx8Um91dGVRdWVyeXxSb3V0ZVNlZ21lbnR8Um93fFwiICtcbiAgICAgICAgICAgICAgICBcIlJvd0xheW91dHxTY2FsZXxTY2FsZUFuaW1hdG9yfFNjYXR0ZXIzRHxTY2F0dGVyM0RTZXJpZXN8U2NhdHRlckRhdGFQcm94eXxTY2F0dGVyU2VyaWVzfFNjZW5lMkR8U2NlbmUzRHxTY2VuZUxvYWRlcnxcIiArXG4gICAgICAgICAgICAgICAgXCJTY2lzc29yVGVzdHxTY3JlZW58U2NyZWVuUmF5Q2FzdGVyfFNjcmlwdEFjdGlvbnxTY3JvbGxCYXJ8U2Nyb2xsSW5kaWNhdG9yfFNjcm9sbFZpZXd8U2Nyb2xsVmlld1N0eWxlfFNjeG1sU3RhdGVNYWNoaW5lfFwiICtcbiAgICAgICAgICAgICAgICBcIlNlYW1sZXNzQ3ViZW1hcHxTZWxlY3Rpb25MaXN0SXRlbXxTZW5zb3J8U2Vuc29yR2VzdHVyZXxTZW5zb3JHbG9iYWx8U2Vuc29yUmVhZGluZ3xTZXF1ZW50aWFsQW5pbWF0aW9ufFNldHRpbmdzfFwiICtcbiAgICAgICAgICAgICAgICBcIlNldHRpbmdzU3RvcmV8U2hhZGVyRWZmZWN0fFNoYWRlckVmZmVjdFNvdXJjZXxTaGFkZXJQcm9ncmFtfFNoYWRlclByb2dyYW1CdWlsZGVyfFNoYXBlfFNoZWxsU3VyZmFjZXxTaGVsbFN1cmZhY2VJdGVtfFwiICtcbiAgICAgICAgICAgICAgICBcIlNoaWZ0SGFuZGxlcnxTaGlmdEtleXxTaG9ydGN1dHxTaWduYWxTcHl8U2lnbmFsVHJhbnNpdGlvbnxTaW5nbGVQb2ludEhhbmRsZXJ8U2tlbGV0b258U2tlbGV0b25Mb2FkZXJ8U2xpZGVyfFNsaWRlclN0eWxlfFwiICtcbiAgICAgICAgICAgICAgICBcIlNtb290aGVkQW5pbWF0aW9ufFNvcnRQb2xpY3l8U291bmR8U291bmRFZmZlY3R8U291bmRJbnN0YW5jZXxTcGFjZUtleXxTcGhlcmVHZW9tZXRyeXxTcGhlcmVNZXNofFNwaW5Cb3h8U3BpbkJveFN0eWxlfFwiICtcbiAgICAgICAgICAgICAgICBcIlNwbGluZVNlcmllc3xTcGxpdFZpZXd8U3BvdExpZ2h0fFNwcmluZ0FuaW1hdGlvbnxTcHJpdGV8U3ByaXRlR29hbHxTcHJpdGVTZXF1ZW5jZXxTdGFja3xTdGFja0xheW91dHxTdGFja1ZpZXd8XCIgK1xuICAgICAgICAgICAgICAgIFwiU3RhY2tWaWV3RGVsZWdhdGV8U3RhY2tlZEJhclNlcmllc3xTdGF0ZXxTdGF0ZUNoYW5nZVNjcmlwdHxTdGF0ZUdyb3VwfFN0YXRlTWFjaGluZXxTdGF0ZU1hY2hpbmVMb2FkZXJ8U3RhdHVzQmFyfFwiICtcbiAgICAgICAgICAgICAgICBcIlN0YXR1c0JhclN0eWxlfFN0YXR1c0luZGljYXRvcnxTdGF0dXNJbmRpY2F0b3JTdHlsZXxTdGVuY2lsTWFza3xTdGVuY2lsT3BlcmF0aW9ufFN0ZW5jaWxPcGVyYXRpb25Bcmd1bWVudHN8U3RlbmNpbFRlc3R8XCIgK1xuICAgICAgICAgICAgICAgIFwiU3RlbmNpbFRlc3RBcmd1bWVudHN8U3RvcmV8U3RyaW5nfFN1cHBsaWVyfFN1cmZhY2UzRHxTdXJmYWNlM0RTZXJpZXN8U3VyZmFjZURhdGFQcm94eXxTd2lwZURlbGVnYXRlfFN3aXBlVmlld3xTd2l0Y2h8XCIgK1xuICAgICAgICAgICAgICAgIFwiU3dpdGNoRGVsZWdhdGV8U3dpdGNoU3R5bGV8U3ltYm9sTW9kZUtleXxTeXN0ZW1QYWxldHRlfFRhYnxUYWJCYXJ8VGFiQnV0dG9ufFRhYlZpZXd8VGFiVmlld1N0eWxlfFRhYmxlVmlld3xUYWJsZVZpZXdDb2x1bW58XCIgK1xuICAgICAgICAgICAgICAgIFwiVGFibGVWaWV3U3R5bGV8VGFwSGFuZGxlcnxUYXBSZWFkaW5nfFRhcFNlbnNvcnxUYXJnZXREaXJlY3Rpb258VGFza2JhckJ1dHRvbnxUZWNobmlxdWV8VGVjaG5pcXVlRmlsdGVyfFRlc3RDYXNlfFRleHR8VGV4dEFyZWF8XCIgK1xuICAgICAgICAgICAgICAgIFwiVGV4dEFyZWFTdHlsZXxUZXh0RWRpdHxUZXh0RmllbGR8VGV4dEZpZWxkU3R5bGV8VGV4dElucHV0fFRleHRNZXRyaWNzfFRleHR1cmVJbWFnZXxUZXh0dXJlSW1hZ2VGYWN0b3J5fFRoZW1lM0R8VGhlbWVDb2xvcnxcIiArXG4gICAgICAgICAgICAgICAgXCJUaHJlc2hvbGRNYXNrfFRodW1ibmFpbFRvb2xCYXJ8VGh1bWJuYWlsVG9vbEJ1dHRvbnxUaWx0UmVhZGluZ3xUaWx0U2Vuc29yfFRpbWVvdXRUcmFuc2l0aW9ufFRpbWVyfFRvZ2dsZUJ1dHRvbnxcIiArXG4gICAgICAgICAgICAgICAgXCJUb2dnbGVCdXR0b25TdHlsZXxUb29sQmFyfFRvb2xCYXJTdHlsZXxUb29sQnV0dG9ufFRvb2xTZXBhcmF0b3J8VG9vbFRpcHxUb3JjaHxUb3J1c0dlb21ldHJ5fFRvcnVzTWVzaHxUb3VjaEV2ZW50U2VxdWVuY2V8XCIgK1xuICAgICAgICAgICAgICAgIFwiVG91Y2hJbnB1dEhhbmRsZXIzRHxUb3VjaFBvaW50fFRyYWNlfFRyYWNlQ2FudmFzfFRyYWNlSW5wdXRBcmVhfFRyYWNlSW5wdXRLZXl8VHJhY2VJbnB1dEtleVBhbmVsfFRyYWlsRW1pdHRlcnxUcmFuc2FjdGlvbnxcIiArXG4gICAgICAgICAgICAgICAgXCJUcmFuc2Zvcm18VHJhbnNpdGlvbnxUcmFuc2xhdGV8VHJlZVZpZXd8VHJlZVZpZXdTdHlsZXxUdW1ibGVyfFR1bWJsZXJDb2x1bW58VHVtYmxlclN0eWxlfFR1cmJ1bGVuY2V8VW5pZm9ybUFuaW1hdG9yfFVzZXJ8XCIgK1xuICAgICAgICAgICAgICAgIFwiVkJhck1vZGVsTWFwcGVyfFZCb3hQbG90TW9kZWxNYXBwZXJ8VkNhbmRsZXN0aWNrTW9kZWxNYXBwZXJ8VlBpZU1vZGVsTWFwcGVyfFZYWU1vZGVsTWFwcGVyfFZhbHVlQXhpc3xWYWx1ZUF4aXMzRHxcIiArXG4gICAgICAgICAgICAgICAgXCJWYWx1ZUF4aXMzREZvcm1hdHRlcnxWZWN0b3IzZEFuaW1hdGlvbnxWZXJ0ZXhCbGVuZEFuaW1hdGlvbnxWaWRlb3xWaWRlb091dHB1dHxWaWV3VHJhbnNpdGlvbnxWaWV3cG9ydHxcIiArXG4gICAgICAgICAgICAgICAgXCJWaXJ0dWFsS2V5Ym9hcmRTZXR0aW5nc3xXYW5kZXJ8V2F2ZWZyb250TWVzaHxXYXlsYW5kQ2xpZW50fFdheWxhbmRDb21wb3NpdG9yfFdheWxhbmRIYXJkd2FyZUxheWVyfFwiICtcbiAgICAgICAgICAgICAgICBcIldheWxhbmRPdXRwdXR8V2F5bGFuZFF1aWNrSXRlbXxXYXlsYW5kU2VhdHxXYXlsYW5kU3VyZmFjZXxXYXlsYW5kVmlld3xXYXlwb2ludHxcIiArXG4gICAgICAgICAgICAgICAgXCJXZWJDaGFubmVsfFdlYkVuZ2luZXxXZWJFbmdpbmVBY3Rpb258V2ViRW5naW5lQ2VydGlmaWNhdGVFcnJvcnxXZWJFbmdpbmVEb3dubG9hZEl0ZW18V2ViRW5naW5lSGlzdG9yeXxcIiArXG4gICAgICAgICAgICAgICAgXCJXZWJFbmdpbmVIaXN0b3J5TGlzdE1vZGVsfFdlYkVuZ2luZUxvYWRSZXF1ZXN0fFdlYkVuZ2luZU5hdmlnYXRpb25SZXF1ZXN0fFdlYkVuZ2luZU5ld1ZpZXdSZXF1ZXN0fFdlYkVuZ2luZVByb2ZpbGV8V2ViRW5naW5lU2NyaXB0fFwiICtcbiAgICAgICAgICAgICAgICBcIldlYkVuZ2luZVNldHRpbmdzfFdlYkVuZ2luZVZpZXd8V2ViU29ja2V0fFdlYlNvY2tldFNlcnZlcnxXZWJWaWV3fFdlYlZpZXdMb2FkUmVxdWVzdHxcIiArXG4gICAgICAgICAgICAgICAgXCJXaGVlbEV2ZW50fFdpbmRvd3xXbFNoZWxsfFdsU2hlbGxTdXJmYWNlfFdvcmtlclNjcmlwdHxYQW5pbWF0b3J8XCIgK1xuICAgICAgICAgICAgICAgIFwiWFlQb2ludHxYWVNlcmllc3xYZGdEZWNvcmF0aW9uTWFuYWdlclYxfFhkZ1BvcHVwfFhkZ1BvcHVwVjV8WGRnUG9wdXBWNnxcIiArXG4gICAgICAgICAgICAgICAgXCJYZGdTaGVsbHxYZGdTaGVsbFY1fFhkZ1NoZWxsVjZ8WGRnU3VyZmFjZXxYZGdTdXJmYWNlVjV8WGRnU3VyZmFjZVY2fFwiICtcbiAgICAgICAgICAgICAgICBcIlhkZ1RvcGxldmVsfFhkZ1RvcGxldmVsVjZ8WG1sTGlzdE1vZGVsfFhtbFJvbGV8WUFuaW1hdG9yfFpvb21CbHVyXCIsXG4gICAgICAgICAgICBcInN0b3JhZ2UudHlwZVwiOlxuICAgICAgICAgICAgICAgIFwiY29uc3R8bGV0fHZhcnxmdW5jdGlvbnxcIiArIC8vIGpzXG4gICAgICAgICAgICAgICAgXCJwcm9wZXJ0eXxcIiwgLy8gcW1sXG4gICAgICAgICAgICBcImNvbnN0YW50Lmxhbmd1YWdlXCI6XG4gICAgICAgICAgICAgICAgXCJudWxsfEluZmluaXR5fE5hTnx1bmRlZmluZWRcIixcbiAgICAgICAgICAgIFwic3VwcG9ydC5mdW5jdGlvblwiOlxuICAgICAgICAgICAgICAgIFwicHJpbnR8Y29uc29sZVxcXFwubG9nXCIsXG4gICAgICAgICAgICBcImNvbnN0YW50Lmxhbmd1YWdlLmJvb2xlYW5cIjogXCJ0cnVlfGZhbHNlXCJcbiAgICAgICAgfSwgXCJpZGVudGlmaWVyXCIpO1xuXG4gICAgICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAgICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuICAgICAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgICAgIFwic3RhcnRcIiA6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gc2luZ2xlIGxpbmVcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiAnXCInLFxuICAgICAgICAgICAgICAgICAgICBuZXh0ICA6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGhleFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiMFt4WF1bMC05YS1mQS1GXStcXFxcYlwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBmbG9hdFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiWystXT9cXFxcZCsoPzooPzpcXFxcLlxcXFxkKik/KD86W2VFXVsrLV0/XFxcXGQrKT8pP1xcXFxiXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5ib29sZWFuXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoPzp0cnVlfGZhbHNlKVxcXFxiXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbJ10oPzooPzpcXFxcXFxcXC4pfCg/OlteJ1xcXFxcXFxcXSkpKj9bJ11cIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXC8uKiRcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXCpcIixcbiAgICAgICAgICAgICAgICAgICAgbmV4dCAgOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiW1soe11cIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiW1xcXFxdKX1dXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBrZXl3b3JkTWFwcGVyLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXGJcXFxcdytcXFxcYlwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFwic3RyaW5nXCIgOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcXFwoPzp4WzAtOWEtZkEtRl17Mn18dVswLTlhLWZBLUZdezR9fFtcIlxcXFxcXC9iZm5ydF0pL1xuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6ICdcInwkJyxcbiAgICAgICAgICAgICAgICAgICAgbmV4dCAgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJjb21tZW50XCIgOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5lbmRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgICAgICAgICAgICAgbmV4dCAgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb21tZW50XCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICB9O1xuXG4gICAgb29wLmluaGVyaXRzKFFtbEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG4gICAgZXhwb3J0cy5RbWxIaWdobGlnaHRSdWxlcyA9IFFtbEhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9